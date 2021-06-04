# Home Control Interface
Home Control Interface for Jeedom

# Installation
<code>git clone https://github.com/fouille/control.home</code>

# Configuration
Edit <code>/data/data.json</code> with yours ID data modules (find in your Jeedom).

# Meteo module
The meteo module check Jeedom ID in group. Based on the Jeedom plugin Weather.
For activate the module please set JSON Data:
<code>"active": "1"</code>
Elements :
<code>"condition_id": "your_id"</code> Return the weather condition "sun", "rain"...
<code>"temperature_id": "your_id"</code> Return the temperature.
<code>"wind_speed_id": "your_id"</code> Return the wind speed.
<code>"pressure_id": "your_id"</code> Return the "mb" pressure.

# Update Home Control
For update files please run this commands in the Home Control directory path:
```
git fetch --all
git reset --hard origin/main
git pull origin main
```
