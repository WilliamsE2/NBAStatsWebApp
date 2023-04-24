from flask import (Flask, jsonify)
from bs4 import BeautifulSoup
import requests

app = Flask(__name__)

def scrape():
    source = requests.get('https://www.basketball-reference.com/leagues/NBA_2023_per_game.html')
    source.raise_for_status()

    soup = BeautifulSoup(source.text, 'html.parser')
    
    player_data = soup.find('tbody').find_all('tr', class_="full_table")
    return player_data

def aggregate():
    player_list = []
    player_data = scrape()
    
    player_id = 1;
    
    for player in player_data:
        stats = player.find_all('td')
        fg_percentage_value =  stats[9].text if len(stats[9].text) == 0 else float(stats[9].text)
        three_fg_percentage_value =  stats[12].text if len(stats[12].text) == 0 else float(stats[12].text)
        two_fg_percentage_value =  stats[15].text if len(stats[15].text) == 0 else float(stats[15].text)
        efg_percentage_value =  stats[16].text if len(stats[16].text) == 0 else float(stats[16].text)
        ft_percentage_value =  stats[19].text if len(stats[19].text) == 0 else float(stats[19].text)
        player_list.append({
            "id": player_id,
            "player": stats[0].text,
            "position": stats[1].text,
            "age": float(stats[2].text),
            "team": stats[3].text,
            "gamesPlayed": float(stats[4].text),
            "gamesStarted": float(stats[5].text),
            "minutesPlayedPerGame": float(stats[6].text),
            "fieldGoalsPerGame": float(stats[7].text),
            "fieldGoalAttemptsPerGame": float(stats[8].text),
            "fieldGoalPercentage": fg_percentage_value,
            "threePointFieldGoalsPerGame": float(stats[10].text),
            "threePointFieldGoalAttemptsPerGame": float(stats[11].text),
            "threePointFieldGoalPercentage": three_fg_percentage_value,
            "twoPointFieldGoalsPerGame": float(stats[13].text),
            "twoPointFieldGoalAttemptsPerGame": float(stats[14].text),
            "twoPointFieldGoalPercentage": two_fg_percentage_value,
            "effectiveFieldGoalPercentage": efg_percentage_value,
            "freeThrowsPerGame": float(stats[17].text),
            "freeThrowAttemptsPerGame": float(stats[18].text),
            "freeThrowPercentage": ft_percentage_value,
            "offensiveReboundsPerGame": float(stats[20].text),
            "defensiveReboundsPerGame": float(stats[21].text),
            "totalReboundsPerGame": float(stats[22].text),
            "assistsPerGame": float(stats[23].text),
            "stealsPerGame": float(stats[24].text),
            "blocksPerGame": float(stats[25].text),
            "turnoversPerGame": float(stats[26].text),
            "personalFoulsPerGame": float(stats[27].text),
            "pointsPerGame": float(stats[28].text)
        })
        player_id += 1
    
    return jsonify(player_list)

@app.route("/players")
def members():
    return aggregate()

if __name__=='__main__':
    app.run(debug = True)
