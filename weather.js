const API_KEY = 'bffe633b42e3603413c7fbd3f2d2473b';

const input = document.getElementById('cityInput');
const errorEl = document.getElementById('error');
const resultEl = document.getElementById('result');

input.addEventListener('keypress', e => { if (e.key === 'Enter') searchWeather(); });

async function searchWeather() {
  const city = input.value.trim();
  if (!city) return;

  errorEl.classList.add('hidden');
  resultEl.classList.add('hidden');

  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
    if (!res.ok) throw new Error();
    const d = await res.json();

    const toC = k => Math.round(k - 273.15) + '°C';

    document.getElementById('cityName').textContent = d.name;
    document.getElementById('country').textContent = d.sys.country;
    document.getElementById('temp').textContent = toC(d.main.temp);
    document.getElementById('feelsLike').textContent = toC(d.main.feels_like);
    document.getElementById('humidity').textContent = d.main.humidity + '%';
    document.getElementById('wind').textContent = d.wind.speed + ' m/s';
    document.getElementById('minMax').textContent = `${toC(d.main.temp_min)} / ${toC(d.main.temp_max)}`;
    document.getElementById('description').textContent = d.weather[0].description;
    document.getElementById('icon').src = `https://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png`;

    resultEl.classList.remove('hidden');
  } catch {
    errorEl.classList.remove('hidden');
  }
}
