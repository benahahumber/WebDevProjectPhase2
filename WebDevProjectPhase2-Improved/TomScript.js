document.addEventListener("DOMContentLoaded", function () {
  var pearLogo1 = document.getElementById('logo-home1');
  var pearLogo2 = document.getElementById('logo-home2');
  var lottieContainer1 = pearLogo1.querySelector('#lottie-container');
  var lottieContainer2 = pearLogo2.querySelector('#lottie-container');
  const fadeUpElements = document.querySelectorAll('.fade-up');

  //fade up part
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });

  fadeUpElements.forEach(element => {
    observer.observe(element);
  });

  //lottie parts
  var animation1 = lottie.loadAnimation({
    container: lottieContainer1,
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: 'light.json'
  });

  var animation2 = lottie.loadAnimation({
    container: lottieContainer2,
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: 'light.json'
  });

  pearLogo1.addEventListener('mouseover', function () {
    lottieContainer1.style.display = 'block';
    animation1.play();
  });

  pearLogo1.addEventListener('mouseout', function () {
    lottieContainer1.style.display = 'none';
    animation1.stop();
  });

  pearLogo2.addEventListener('mouseover', function () {
    lottieContainer2.style.display = 'block';
    animation2.play();
  });

  pearLogo2.addEventListener('mouseout', function () {
    lottieContainer2.style.display = 'none';
    animation2.stop();
  });
//event listener for form
const inputs = document.querySelectorAll('.input-text');

inputs.forEach(input => {
  input.addEventListener('input', function () {
    if (this.value.trim() !== '') {
      this.classList.add('not-empty');
    } else {
      this.classList.remove('not-empty');
    }
  });
  input.dispatchEvent(new Event('input'));
});

//event listener to the form submit button
const form = document.querySelector('.contact-form');
form.addEventListener('submit', function (event) {
  event.preventDefault();
  alert('Thank you for getting in touch! We will get back to you soon.');
  form.reset();
  inputs.forEach(input => {
    input.classList.remove('not-empty');
  });
});
});

//create root and chart
var root = am5.Root.new("chartdiv");

//set themes
root.setThemes([
  am5themes_Animated.new(root)
]);

var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX",
    //map type
    projection: am5map.geoMercator()
  })
);

//create polygon series
var polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow,
    exclude: ["AQ"]
  })
);
//tooltip settings
polygonSeries.mapPolygons.template.setAll({
  tooltipText: "{name}",
  interactive: true,
  fill: am5.color(0x595959)
});
//hover setting
polygonSeries.mapPolygons.template.states.create("hover", {
  fill: am5.color(0x5BE9B9)
});

//create point series
var pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {
  latitudeField: "lat",
  longitudeField: "long"
}));
//
pointSeries.bullets.push(function () {
  var circle = am5.Circle.new(root, {
    radius: 5,
    fill: am5.color(0xff0000),
    tooltipText: "{name}"
  });
  //onclick settings
  circle.events.on("click", function (ev) {
    location.href = "https://www.google.ca/maps/place/1563+Pennsylvania+Avenue+NW,+Washington,+DC+20006,+USA/@38.8976804,-77.0391047,17z/data=!4m14!1m7!3m6!1s0x89b7b7bcdecbb1df:0x715969d86d0b76bf!2sThe+White+House!8m2!3d38.8976763!4d-77.0365298!16zL20vMDgxc3E!3m5!1s0x89b7b7bcff631ae9:0xfe3182655c85cd4d!8m2!3d38.8986457!4d-77.0364987!16s%2Fg%2F11h4vm6k6_?entry=ttu";
  });

  return am5.Bullet.new(root, {
    sprite: circle
  });
});

//locations
pointSeries.data.setAll([{
  long: -73.778137,
  lat: 40.641312,
  name: "New York: 2 Stores"
}, {
  long: -122.4194,
  lat: 37.7749,
  name: "HQ"
}, {
  long: -122.3328,
  lat: 47.6061,
  name: "Seattle: 1 Store"
}]);

//Reset button
document.getElementById('reset-map-btn').addEventListener('click', function () {
  chart.set("rotationX", 0);
  chart.set("rotationY", 0);
  chart.set("rotationZ", 0);
  chart.goHome();
});
