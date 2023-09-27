<template>
  <div>
    <h1>Réservez une montgolfière</h1>
    <ClickableMap @zone-selected="zoneSelected" @point-selected="pointSelected" />
    <div v-if="selectedZones.length > 0">
      <h2>Zones sélectionnées :</h2>
      <ul>
        <li v-for="zone in selectedZones" :key="zone.id">{{ zone.id }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import ClickableMap from '@/components/ClickableMap.vue';

export default {
  components: {
    ClickableMap,
  },
  data() {
    return {
      selectedZones: [],
    };
  },
  methods: {
    zoneSelected(zone) {
      const index = this.selectedZones.findIndex((z) => z.id === zone.id);
      if (index === -1) {
        this.selectedZones.push(zone);
      } else {
        this.selectedZones.splice(index, 1);
      }
    },
    pointSelected(point) {
      const index = this.selectedPoints.findIndex((z) => z.id === point.id);
      if (index === -1) {
        this.selectedPoints.push(point);
      } else {
        this.selectedPoints.splice(index, 1);
      }
    }
  },
};
</script>
