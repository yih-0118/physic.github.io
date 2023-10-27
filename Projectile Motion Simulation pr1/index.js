document.getElementById('plot-button').addEventListener('click', function () {
  const initialVelocity = document.getElementById('initial-velocity').value;
  const velocityUnit = document.getElementById('velocity-unit').value;
  var v0 = parseFloat(document.getElementById('initial-velocity').value);
  var theta = parseFloat(document.getElementById('launch-angle').value);
  var x0 = parseFloat(document.getElementById('initial-position').value);
  var y0 = parseFloat(document.getElementById('initial-height').value);
  const gravity = parseFloat(document.getElementById('Gravity').value);
  var dt = parseFloat(document.getElementById('time-step').value);

  var pi = 3.14159265359;

  let velocityInMetersPerSecond;
  if (velocityUnit === 'km/h') {
    velocityInMetersPerSecond = v0 / 3.6;
  } else if (velocityUnit === 'mph') {
    velocityInMetersPerSecond = initialVelocity * 0.44704;
  } else {
    velocityInMetersPerSecond = initialVelocity;
  }

  var vx0 = velocityInMetersPerSecond * Math.cos(theta * pi / 180.0);
  var vy0 = velocityInMetersPerSecond * Math.sin(theta * pi / 180.0);

  var flightTime;
  if (y0 > 0) {
    flightTime = (2 * vy0 + Math.sqrt(4 * vy0 * vy0 + 8 * gravity * y0)) / (2 * gravity);
  } else {
    flightTime = (2 * vy0) / gravity;
  }




  var timeIntervals = [];
  for (var t = 0; t <= flightTime; t += dt) {
    timeIntervals.push(t);
  }

  var x_data = [];
  var y_data = [];
  for (var i = 0; i < timeIntervals.length; i++) {
    var t = timeIntervals[i];
    var x = x0 + vx0 * t;
    var y;

    if (y0 > 0 && theta >= 270 && theta <= 360) {
      y = y0 + vy0 * t + (0.5 * gravity * t * t);
    } else {
      y = y0 + vy0 * t - (0.5 * gravity * t * t);
    }

    x_data.push(x);
    y_data.push(y);
  }
  var max_height = -1;
  var x_max_height;
  for (var i = 0; i < y_data.length; i++) {
    if (y_data[i] > max_height) {
      max_height = y_data[i];
      x_max_height = i;
    }
  }




  var t_data = [];
  for (var i = 0; i < x_data.length; i++) {
    t_data.push(i * dt);
  }
  var Change = false;




  document.getElementById('toggle-plot').addEventListener('click', function () {

    Change = !Change;

    if (Change) {
      var trace_2D = {
        x: x_data,
        y: y_data,
        type: 'scatter',
        mode: 'lines',
        line: {
          color: '#66B3FF',
          width: 1.5
        }
      };

      var layout_2D = {
        title: 'Projectile Motion',
        xaxis: {
          title: 'Horizontal Distance (m)'
        },
        yaxis: {
          title: 'Vertical Distance (m)'
        }
      };


      Plotly.newPlot('plot', [trace_2D], layout_2D);
    } else {
      var trace_3D = {
        x: t_data,
        y: x_data,
        z: y_data,
        mode: 'lines',
        type: 'scatter3d',
        line: {
          color: '#17BECF',
          width: 5
        }
      };

      var layout_3D = {
        scene: {
          xaxis: {
            title: 'Time (s)'
          },
          yaxis: {
            title: 'Horizontal Distance (m)'
          },
          zaxis: {
            title: 'Vertical Distance (m)'
          }
        }
      };

      Plotly.newPlot('plot', [trace_3D], layout_3D);
    }

  })





  //var data = [trace];
  // Plotly.newPlot('plot', data, layout);
  console.log("落點:" + "(" + x_data[x_data.length - 1] + "," + 0 + ")")
  //console.log("("+ x_data[x_data.length - 1] +","+ 0+")");
  console.log("最高點:" + "(" + x_data[x_max_height] + "," + y_data[x_max_height] + ")");
  //console.log("("+ x_data[x_max_height] +","+ y_data[x_max_height]+ ")");


});


