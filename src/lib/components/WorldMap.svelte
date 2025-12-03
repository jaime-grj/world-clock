<script>
  import { onMount, createEventDispatcher } from "svelte";
  import * as d3 from "d3";
  import { feature } from "topojson-client";
  import world from "$lib/data/world-100m.json";
  import { countryTimezones } from "$lib/data/countryTimezones.js";

  const dispatch = createEventDispatcher();

  export let width = 900;
  export let height = 500;

  let svgContainer;

  onMount(() => {
    drawMap();
  });

  function drawMap() {
    const countries = feature(world, world.objects.countries).features;

    const projection = d3.geoMercator()
      .scale((width / (2 * Math.PI)) * 0.9)
      .translate([width / 2, height / 1.5]);

    const path = d3.geoPath().projection(projection);

    const svg = d3.select(svgContainer)
      .attr("width", width)
      .attr("height", height);

    // Fondo
    svg.append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "#eef6ff");

    // Países
    svg.append("g")
      .selectAll("path")
      .data(countries)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("fill", "#d1ddf0")
      .attr("stroke", "#555")
      .attr("stroke-width", 0.5)
      .on("mouseover", function () {
        d3.select(this).attr("fill", "#a4c0e8");
      })
      .on("mouseout", function () {
        d3.select(this).attr("fill", "#d1ddf0");
      })
      .on("click", function (_, d) {
        const countryName = d.properties.name;
        const tz = countryTimezones[countryName];

        if (tz) {
          dispatch("addFavorite", tz);
        } else {
          alert(`No tengo zona horaria para: ${countryName}`);
        }
      });
  }
</script>

<svg bind:this={svgContainer}></svg>

<style>
  svg {
    border-radius: 8px;
    box-shadow: 0 0 10px #0002;
  }
</style>
