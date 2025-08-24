import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useI18n } from '../context/I18nContext';

// Fix for default markers in Leaflet with React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface BiharFloodMapProps {
  className?: string;
  selectedDistrict?: string;
  onDistrictChange?: (district: string) => void;
  selectedHour?: number;
  activeLayer?: string;
  onLayerChange?: (layer: string) => void;
}

// All 39 Bihar districts with coordinates and risk levels
const biharDistricts = [
  { name: "Araria", coords: [26.1497, 87.5156], risk: "High" },
  { name: "Arwal", coords: [25.2522, 84.6819], risk: "Low" },
  { name: "Aurangabad", coords: [24.7521, 84.3742], risk: "Medium" },
  { name: "Banka", coords: [24.8881, 86.9250], risk: "Low" },
  { name: "Begusarai", coords: [25.4182, 86.1272], risk: "Medium" },
  { name: "Bhagalpur", coords: [25.2425, 86.9842], risk: "Medium" },
  { name: "Bhojpur", coords: [25.5562, 84.6644], risk: "Low" },
  { name: "Buxar", coords: [25.5648, 83.9784], risk: "Low" },
  { name: "Darbhanga", coords: [26.1542, 85.8918], risk: "High" },
  { name: "East Champaran (Motihari)", coords: [26.6487, 84.9194], risk: "High" },
  { name: "Gaya", coords: [24.7914, 85.0002], risk: "Low" },
  { name: "Gopalganj", coords: [26.4669, 84.4331], risk: "Medium" },
  { name: "Jamui", coords: [24.9267, 86.2239], risk: "Low" },
  { name: "Jehanabad", coords: [25.2122, 84.9869], risk: "Medium" },
  { name: "Kaimur (Bhabua)", coords: [25.0367, 83.6075], risk: "Low" },
  { name: "Katihar", coords: [25.5394, 87.5789], risk: "High" },
  { name: "Khagaria", coords: [25.5017, 86.4781], risk: "High" },
  { name: "Kishanganj", coords: [26.1058, 87.9489], risk: "High" },
  { name: "Lakhisarai", coords: [25.1667, 86.0833], risk: "Medium" },
  { name: "Madhepura", coords: [25.9158, 86.7844], risk: "High" },
  { name: "Madhubani", coords: [26.3489, 86.0644], risk: "High" },
  { name: "Munger", coords: [25.3764, 86.4733], risk: "Low" },
  { name: "Muzaffarpur", coords: [26.1209, 85.3647], risk: "High" },
  { name: "Nalanda", coords: [25.1372, 85.4428], risk: "Medium" },
  { name: "Nawada", coords: [24.8831, 85.5394], risk: "Low" },
  { name: "Patna", coords: [25.5941, 85.1376], risk: "Medium" },
  { name: "Purnea", coords: [25.7771, 87.4753], risk: "High" },
  { name: "Rohtas", coords: [24.9531, 84.0331], risk: "Low" },
  { name: "Saharsa", coords: [25.8744, 86.5967], risk: "High" },
  { name: "Samastipur", coords: [25.8647, 85.7828], risk: "Medium" },
  { name: "Saran (Chhapra)", coords: [25.7781, 84.7478], risk: "Medium" },
  { name: "Sheikhpura", coords: [25.1394, 85.8508], risk: "Low" },
  { name: "Sheohar", coords: [26.5181, 85.2958], risk: "Medium" },
  { name: "Sitamarhi", coords: [26.5928, 85.4928], risk: "High" },
  { name: "Siwan", coords: [26.2189, 84.3622], risk: "Medium" },
  { name: "Supaul", coords: [26.1267, 86.6006], risk: "High" },
  { name: "Vaishali", coords: [25.9894, 85.1319], risk: "Medium" },
  { name: "West Champaran", coords: [27.0833, 84.5000], risk: "High" }
];

const BiharFloodMap: React.FC<BiharFloodMapProps> = ({ 
  className = '', 
  selectedDistrict, 
  onDistrictChange,
  selectedHour = 12,
  activeLayer = 'flood-risk',
  onLayerChange
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  const { t, currentLanguage } = useI18n();

  useEffect(() => {
    if (!mapRef.current) return;

    // If map exists (e.g., after language change), remove and rebuild so UI texts update
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Initialize map constrained to India so it never shows grey outside
    const indiaBounds: L.LatLngBoundsExpression = [[6.0, 68.0], [37.0, 97.0]];
    const map = L.map(mapRef.current!, {
      center: [25.5941, 85.1376], // Focus near Bihar/India center
      zoom: 7, // ~50% closer than 5
      // Re-enable default Leaflet +/- zoom control at top-left
      zoomControl: true,
      scrollWheelZoom: true,
      doubleClickZoom: true,
      touchZoom: true,
      boxZoom: false,
      keyboard: false,
      dragging: true,
      maxBounds: indiaBounds, // Strictly keep view within India
      maxBoundsViscosity: 1.0, // Hard boundary feel
      minZoom: 6,
      maxZoom: 12,
      zoomSnap: 1,
      zoomDelta: 1
    });
    mapInstanceRef.current = map;

    // Base layer; noWrap avoids world copies; combined with maxBounds prevents grey edges
    const baseLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 13,
      minZoom: 4,
      noWrap: true,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Ensure the map fills its container
    setTimeout(() => map.invalidateSize(), 0);

    // Add layer control (localized)
    const layerControl = (L as any).control({ position: 'topright' });
    layerControl.onAdd = function () {
      const div = L.DomUtil.create('div', 'layer-control');
      div.innerHTML = `
        <div style="background: rgba(255,255,255,0.95); border-radius: 10px; padding: 16px; font-size: 15px; box-shadow: 0 2px 8px rgba(0,0,0,0.15); min-width: 182px;">
          <div style="font-weight: 700; margin-bottom: 10px; color: #1f2937; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">📊 ${t('map.layers')}</div>
          <div style="margin: 8px 0;">
            <label style="display: flex; align-items: center; cursor: pointer; padding: 4px 0;">
              <input type="radio" name="layer" value="flood-risk" ${activeLayer === 'flood-risk' ? 'checked' : ''} style="margin-right: 8px;">
              <span style="font-size: 13px; color: #374151;">🌊 ${t('map.floodRisk')}</span>
            </label>
          </div>
          <div style="margin: 8px 0;">
            <label style="display: flex; align-items: center; cursor: pointer; padding: 4px 0;">
              <input type="radio" name="layer" value="rainfall" ${activeLayer === 'rainfall' ? 'checked' : ''} style="margin-right: 8px;">
              <span style="font-size: 13px; color: #374151;">🌧️ ${t('map.rainfallLevel')}</span>
            </label>
          </div>
          <div style="margin: 8px 0;">
            <label style="display: flex; align-items: center; cursor: pointer; padding: 4px 0;">
              <input type="radio" name="layer" value="water-level" ${activeLayer === 'water-level' ? 'checked' : ''} style="margin-right: 8px;">
              <span style="font-size: 13px; color: #374151;">💧 ${t('map.waterLevel')}</span>
            </label>
          </div>
          <div style="margin: 8px 0;">
            <label style="display: flex; align-items: center; cursor: pointer; padding: 4px 0;">
              <input type="radio" name="layer" value="population" ${activeLayer === 'population' ? 'checked' : ''} style="margin-right: 8px;">
              <span style="font-size: 13px; color: #374151;">👥 ${t('map.populationDensity')}</span>
            </label>
          </div>
        </div>
      `;
      
      // Add event listeners for layer switching
      div.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement;
        if (target.name === 'layer' && onLayerChange) {
          onLayerChange(target.value);
        }
      });
      
      return div;
    };
    layerControl.addTo(map);

    // Default zoom control is enabled above; no custom slider

    // Add legend (~30% larger, localized)
    const legend = (L as any).control({ position: 'bottomleft' });
    legend.onAdd = function () {
      const div = L.DomUtil.create('div', 'legend');
      
      const getLegendContent = () => {
        switch (activeLayer) {
          case 'rainfall':
            return `
              <div style="font-weight: 700; margin-bottom: 10px; color: #2c5aa0; font-size: 19px;">🌧️ ${t('map.rainfallLevel')}</div>
              <div style="display: flex; align-items: center; margin: 6px 0;">
                <span style="width: 21px; height: 21px; border-radius: 50%; margin-right: 10px; background: #87ceeb;"></span>
                <span style="font-size: 17px;">${t('legend.light')} (0-5mm)</span>
              </div>
              <div style="display: flex; align-items: center; margin: 6px 0;">
                <span style="width: 21px; height: 21px; border-radius: 50%; margin-right: 10px; background: #4682b4;"></span>
                <span style="font-size: 17px;">${t('legend.moderate')} (5-15mm)</span>
              </div>
              <div style="display: flex; align-items: center; margin: 6px 0;">
                <span style="width: 21px; height: 21px; border-radius: 50%; margin-right: 10px; background: #191970;"></span>
                <span style="font-size: 17px;">${t('legend.heavy')} (15mm+)</span>
              </div>
            `;
          case 'water-level':
            return `
              <div style="font-weight: 700; margin-bottom: 10px; color: #2c5aa0; font-size: 19px;">💧 ${t('map.waterLevel')}</div>
              <div style="display: flex; align-items: center; margin: 6px 0;">
                <span style="width: 21px; height: 21px; border-radius: 50%; margin-right: 10px; background: #40e0d0;"></span>
                <span style="font-size: 17px;">${t('legend.normal')}</span>
              </div>
              <div style="display: flex; align-items: center; margin: 6px 0;">
                <span style="width: 21px; height: 21px; border-radius: 50%; margin-right: 10px; background: #ffa500;"></span>
                <span style="font-size: 17px;">${t('alerts.warning')}</span>
              </div>
              <div style="display: flex; align-items: center; margin: 6px 0;">
                <span style="width: 21px; height: 21px; border-radius: 50%; margin-right: 10px; background: #dc143c;"></span>
                <span style="font-size: 17px;">${t('alerts.danger')}</span>
              </div>
            `;
          case 'population':
            return `
              <div style="font-weight: 700; margin-bottom: 10px; color: #2c5aa0; font-size: 19px;">👥 ${t('map.populationDensity')}</div>
              <div style="display: flex; align-items: center; margin: 6px 0;">
                <span style="width: 21px; height: 21px; border-radius: 50%; margin-right: 10px; background: #90ee90;"></span>
                <span style="font-size: 17px;">Low (&lt;1000/km²)</span>
              </div>
              <div style="display: flex; align-items: center; margin: 6px 0;">
                <span style="width: 21px; height: 21px; border-radius: 50%; margin-right: 10px; background: #ffd700;"></span>
                <span style="font-size: 17px;">Medium (1000-5000/km²)</span>
              </div>
              <div style="display: flex; align-items: center; margin: 6px 0;">
                <span style="width: 21px; height: 21px; border-radius: 50%; margin-right: 10px; background: #ff6347;"></span>
                <span style="font-size: 17px;">High (5000+/km²)</span>
              </div>
            `;
          default:
            return `
              <div style="font-weight: 700; margin-bottom: 10px; color: #2c5aa0; font-size: 19px;">🌊 ${t('map.floodRisk')}</div>
              <div style="display: flex; align-items: center; margin: 6px 0;">
                <span style="width: 21px; height: 21px; border-radius: 50%; margin-right: 10px; background: #27ae60;"></span>
                <span style="font-size: 17px;">${t('risk.low')}</span>
              </div>
              <div style="display: flex; align-items: center; margin: 6px 0;">
                <span style="width: 21px; height: 21px; border-radius: 50%; margin-right: 10px; background: #f39c12;"></span>
                <span style="font-size: 17px;">${t('risk.medium')}</span>
              </div>
              <div style="display: flex; align-items: center; margin: 6px 0;">
                <span style="width: 21px; height: 21px; border-radius: 50%; margin-right: 10px; background: #e74c3c;"></span>
                <span style="font-size: 17px;">${t('risk.high')}</span>
              </div>
            `;
        }
      };
      
      div.innerHTML = `
        <div style="background: rgba(255,255,255,0.95); border-radius: 10px; padding: 18px; font-size: 19px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);">
          ${getLegendContent()}
        </div>
      `;
      return div;
    };
    legend.addTo(map);

    // Define colors for different layers
    const getLayerColors = (layer: string) => {
      switch (layer) {
        case 'rainfall':
          return { "Low": "#87ceeb", "Medium": "#4682b4", "High": "#191970" };
        case 'water-level':
          return { "Low": "#40e0d0", "Medium": "#ffa500", "High": "#dc143c" };
        case 'population':
          return { "Low": "#90ee90", "Medium": "#ffd700", "High": "#ff6347" };
        default:
          return { "Low": "#27ae60", "Medium": "#f39c12", "High": "#e74c3c" };
      }
    };
    
    const getLayerIcons = (layer: string) => {
      switch (layer) {
        case 'rainfall':
          return { "Low": "🌦️", "Medium": "🌧️", "High": "⛈️" };
        case 'water-level':
          return { "Low": "💧", "Medium": "🌊", "High": "🚨" };
        case 'population':
          return { "Low": "👥", "Medium": "👫", "High": "👪" };
        default:
          return { "Low": "🟢", "Medium": "🟠", "High": "🔴" };
      }
    };
    
    // Instantly add district circles with layer data
    const layerColors = getLayerColors(activeLayer);
    const layerIcons = getLayerIcons(activeLayer);
    
    biharDistricts.forEach(district => {
      const circle = L.circle(district.coords as [number, number], {
        color: layerColors[district.risk as keyof typeof layerColors],
        fillColor: layerColors[district.risk as keyof typeof layerColors],
        fillOpacity: selectedDistrict === district.name ? 0.9 : 0.7,
        radius: selectedDistrict === district.name ? 15000 : 12000,
        weight: selectedDistrict === district.name ? 3 : 2
      }).addTo(map);
      
      circle.bindPopup(`
        <div style='text-align: center; padding: 6px; font-family: Inter, sans-serif;'>
          <strong style='font-size: 14px; color: #1f2937;'>${district.name}</strong><br>
          <div style='margin: 4px 0; padding: 2px 6px; background: rgba(59, 130, 246, 0.1); border-radius: 4px; font-size: 12px;'>
            ${layerIcons[district.risk as keyof typeof layerIcons]} <strong>${t(
              activeLayer === 'flood-risk'
                ? 'map.risk'
                : activeLayer === 'rainfall'
                ? 'map.rainfallLevel'
                : activeLayer === 'water-level'
                ? 'map.waterLevel'
                : 'map.density'
            )}</strong>
          </div>
          <small style='color: #6b7280; font-size: 10px;'>${t('map.biharDistrict')}</small>
        </div>
      `);
      
      circle.on('click', () => {
        if (onDistrictChange) {
          onDistrictChange(district.name);
        }
      });
    });
    
    // Focus on selected district if provided
    if (selectedDistrict) {
      const district = biharDistricts.find(d => d.name === selectedDistrict);
      if (district) {
        map.setView(district.coords as [number, number], Math.max(map.getZoom(), 8));
      }
    }

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [activeLayer, selectedDistrict, selectedHour, currentLanguage]);

  return (
    <div 
      ref={mapRef} 
      className={`w-full h-full ${className}`}
      style={{ 
        height: '100%',
        width: '100%'
      }}
    />
  );
};

export default BiharFloodMap;
