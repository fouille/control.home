# Home Control Interface
Home Control Interface for Jeedom

# Installation
```
git clone https://github.com/fouille/control.home
```

# Configuration
Edit <code>/data/data.json</code> with yours ID data modules (find in your Jeedom).

# Meteo module
The meteo module check Jeedom ID in group. Based on the Jeedom plugin Weather.<br>
For activate the module please set JSON Data:<br>
<code>"active": "1"</code><br>
Elements :<br>
<code>"condition_id": "your_id"</code> Return the weather condition "sun", "rain"...<br>
<code>"temperature_id": "your_id"</code> Return the temperature.<br>
<code>"wind_speed_id": "your_id"</code> Return the wind speed.<br>
<code>"pressure_id": "your_id"</code> Return the "mb" pressure.<br>

# Update Home Control
For update files please run this commands in the Home Control directory path:
```
git fetch --all
git reset --hard origin/main
git pull origin main
```
