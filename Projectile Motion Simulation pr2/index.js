document.getElementById('plot-button').addEventListener('click', function() {
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

    var g = 9.7807; 
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

    var trace = {
      x: x_data,
      y: y_data,
      type: 'scatter',
      mode: 'lines',
      line: {
        color: '#66B3FF',
        width: 1.5
      }
    };

    var layout = {
      title: 'Projectile Motion',
      xaxis: {
        title: 'Horizontal Distance (m)'
      },
      yaxis: {
        title: 'Vertical Distance (m)'
      }
    };

    var data = [trace];
    Plotly.newPlot('plot', data, layout);
    console.log("落點:"+"("+ x_data[x_data.length - 1] +","+ "0"+ ")")
    //console.log("("+ x_data[x_data.length - 1] +","+ y_data[y_data.length - 1]+ ")");
    //console.log(end.y_data[end.y_data.length - 1]);
    console.log("最高點"+"("+max_height,x_max_height+")")
    //console.log("("+max_height,x_max_height+")");
    //console.log(x_max_height);

});