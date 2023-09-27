<template>
    <div>
      <svg viewBox="0 0 1000 500" @click="mapClicked($event)">
        <!-- Zones Rectangulaires -->
        <rect v-for="zone in zones"
              :x="zone.x"
              :y="zone.y"
              :width="zone.width"
              :height="zone.height"
              :fill="zone.selected ? 'orange' : 'lightgreen'"
              :id="zone.id"
              :key="zone.id"
              stroke="black"/>
              
        <!-- Zones Circulaires -->
        <circle v-for="circle in circles"
                :cx="circle.x"
                :cy="circle.y"
                :r="circle.radius"
                :fill="circle.selected ? 'orange' : 'lightblue'"
                :id="circle.id"
                :key="circle.id"
                stroke="black"
                @click="circleClicked(circle.id, $event)"/>
                
        <!-- Points Stratégiques -->
        <circle v-for="point in points"
                :cx="point.x"
                :cy="point.y"
                :r="5"
                :id="point.id"
                :key="point.id"
                fill="blue"
                @click="pointClicked(point.id, $event)"/>
                
        <!-- Textes des Zones et Points -->
        <text v-for="zone in [...zones, ...circles]"
              :x="zone.x + (zone.width ? zone.width / 2 : 0)"
              :y="zone.y + (zone.height ? zone.height / 2 : 0) + (zone.radius ? zone.radius : 0)"
              text-anchor="middle"
              alignment-baseline="middle"
              fill="black"
              :key="'text-' + zone.id">{{ zone.id }}</text>
      </svg>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        zones: [
          { id: 'Zone A', x: 10, y: 10, width: 120, height: 80, selected: false },
          { id: 'Zone B', x: 200, y: 30, width: 100, height: 60, selected: false },
          { id: 'Zone C', x: 400, y: 50, width: 140, height: 90, selected: false },
          { id: 'Zone D', x: 600, y: 20, width: 80, height: 60, selected: false },
          { id: 'Zone E', x: 150, y: 150, width: 110, height: 70, selected: false },
          { id: 'Zone F', x: 320, y: 180, width: 90, height: 50, selected: false },
          // Continuez à ajouter autant de zones que vous le souhaitez.
        ],
        circles: [
          { id: 'Cercle 1', x: 100, y: 200, radius: 50, selected: false },
          { id: 'Cercle 2', x: 300, y: 250, radius: 40, selected: false },
          { id: 'Cercle 3', x: 500, y: 200, radius: 60, selected: false },
          { id: 'Cercle 4', x: 700, y: 250, radius: 35, selected: false },
          { id: 'Cercle 5', x: 100, y: 350, radius: 45, selected: false },
          // Continuez à ajouter autant de cercles que vous le souhaitez.
        ],
        points: [
          { id: 'Point 1', x: 60, y: 40 },
          { id: 'Point 2', x: 220, y: 60 },
          { id: 'Point 3', x: 450, y: 95 },
          { id: 'Point 4', x: 620, y: 35 },
          { id: 'Point 5', x: 160, y: 185 },
          { id: 'Point 6', x: 340, y: 205 },
          // Continuez à ajouter autant de points que vous le souhaitez.
        ]
      };
    },
    methods: {
  async mapClicked(event) {
    const clickedId = event.target.id;
    const zone = this.zones.find((z) => z.id === clickedId);
    if (zone) {
      zone.selected = !zone.selected;
      this.$emit('zone-selected', zone);
      try {
        await axios.post('http://localhost:3000/reserve', {
          id: zone.id,
          type: 'zone',
          reservedBy: 'nom de la personne',
        });
      } catch (error) {
        console.error('Erreur lors de la réservation', error);
      }
    }
  },
  async circleClicked(circleId, event) {
    event.stopPropagation();
    const circle = this.circles.find(c => c.id === circleId);
    if (circle) {
      circle.selected = !circle.selected;
      this.$emit('circle-selected', circle);
      try {
        await axios.post('http://localhost:3000/reserve', {
          id: circle.id,
          type: 'circle',
          reservedBy: 'nom de la personne',
        });
      } catch (error) {
        console.error('Erreur lors de la réservation', error);
      }
    }
  },
  async pointClicked(pointId, event) {
    event.stopPropagation();
    const point = this.points.find(p => p.id === pointId);
    this.$emit('point-selected', point);
    try {
      await axios.post('http://localhost:3000/reserve', {
        id: point.id,
        type: 'point',
        reservedBy: 'nom de la personne',
      });
    } catch (error) {
      console.error('Erreur lors de la réservation', error);
    }
  }
},
    
  };
  </script>
  
  <style scoped>
  svg {
    background-color: #f4f4f4;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
  }

  rect, circle {
    transition: fill 0.3s ease, stroke 0.3s ease;
  }

  rect:hover, circle:hover {
    fill: #e2e2e2;
  }

  circle {
    transition: fill 0.3s ease, r 0.3s ease;
  }

  circle:hover {
    r: 7;
  }

  text {
    font-family: 'Arial', sans-serif;
    font-size: 12px;
    pointer-events: none;
  }
</style>

  