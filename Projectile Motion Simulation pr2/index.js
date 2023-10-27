document.getElementById('plot-button').addEventListener('click', function () {
  const initialVelocity = document.getElementById('initial-velocity').value;
  const velocityUnit = document.getElementById('velocity-unit').value;
  var v0 = parseFloat(document.getElementById('initial-velocity').value);
  var theta = parseFloat(document.getElementById('launch-angle').value);
  var dt = parseFloat(document.getElementById('time-step').value);
  var x0 = parseFloat(document.getElementById('initial-position').value);
  var m = parseFloat(document.getElementById('mass').value);
  var y = parseFloat(document.getElementById('initial-height').value);
  var rho = parseFloat(document.getElementById('air-density').value);
  var Cd = parseFloat(document.getElementById('drag-coefficient').value);
  var A = parseFloat(document.getElementById('cross-sectional-area').value);

  var g = parseFloat(document.getElementById('Gravity').value);
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
  var t = 0.0, x = x0, max_height = 0.0;
  var x_max_height = 0.0;
  var x_data = [], y_data = [];

  while (y >= 0.0) {
    x_data.push(x);
    y_data.push(y);

    var Fd = 0.5 * rho * Cd * A * (vx0 * vx0 + vy0 * vy0);
    var Fx = -Fd * vx0 / Math.sqrt(vx0 * vx0 + vy0 * vy0);
    var Fy = -Fd * vy0 / Math.sqrt(vx0 * vx0 + vy0 * vy0);

    var vx = vx0 + (Fx / m) * dt;
    var vy = vy0 - g * dt + (Fy / m) * dt;

    x += vx0 * dt;
    y += vy0 * dt;

    vx0 = vx;
    vy0 = vy;

    if (y > max_height) {
      max_height = y;
      x_max_height = x;
    }

    t += dt;
  }

  var t_data = [];

  for (var i = 0; i < x_data.length; i++) {
    t_data.push(i * dt);
  }

  var coords_data = [];

  for (var i = 0; i < x_data.length; i++) {
    coords_data.push(i * dt);
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
        x: coords_data,
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


  console.log("落點:" + "(" + x_data[x_data.length - 1] + "," + "0" + ")")
  //console.log("("+ x_data[x_data.length - 1] +","+ y_data[y_data.length - 1]+ ")");
  //console.log(end.y_data[end.y_data.length - 1]);
  console.log("最高點:" + "(" + max_height, x_max_height + ")")
  //console.log("("+max_height,x_max_height+")");
  //console.log(x_max_height);
  //alert("落點:"+"("+ x_data[x_data.length - 1] +","+ "0"+ ")" )
  //alert("最高點:"+"("+max_height+","+x_max_height+")")

});