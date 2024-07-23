document.addEventListener("DOMContentLoaded", function() {
    var pearLogo = document.getElementById('logo-home');
    var lottieContainer = document.getElementById('lottie-container');

    var animation = lottie.loadAnimation({
        container: lottieContainer,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: 'light.json'
    });

    pearLogo.addEventListener('mouseover', function() {
        lottieContainer.style.display = 'block';
        animation.play();
    });

    pearLogo.addEventListener('mouseout', function() {
        lottieContainer.style.display = 'none';
        animation.stop();
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
    //mat type
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
pointSeries.bullets.push(function() {
  var circle = am5.Circle.new(root, {
    radius: 5,
    fill: am5.color(0xff0000),
    tooltipText: "{name}"
  });

  circle.events.on("click", function(ev) {
    alert("Clicked on " + ev.target.dataItem.dataContext.name)
  });

  return am5.Bullet.new(root, {
    sprite: circle
  });
});

pointSeries.data.setAll([{
  long: -73.778137,
  lat: 40.641312,
  name: "New York 2 Stores"
}, {
  long: -122.4194,
  lat: 37.7749,
  name: "HQ"
}, {
  long: -122.3328,
  lat: 47.6061,
  name: "Seattle 1 Store"
}]);

//Reset button
document.getElementById('reset-map-btn').addEventListener('click', function() {
    chart.set("rotationX", 0);
    chart.set("rotationY", 0);
    chart.set("rotationZ", 0);
    chart.goHome();
});
