import { MapLayer, withLeaflet } from "react-leaflet";
import "leaflet.markercluster/dist/leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import L from "leaflet";
// define a React component 
class MarkerClusterGroup extends MapLayer {
  createLeafletElement({ leaflet: { map }, setMarkerClusterObj }) {
    const markerClusterGroup = new L.markerClusterGroup(setMarkerClusterObj);
    this.contextValue = { layerContainer: markerClusterGroup, map };

    return markerClusterGroup;
  }
}

export default withLeaflet(MarkerClusterGroup);
