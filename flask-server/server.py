from flask import (Flask, jsonify)
from bs4 import BeautifulSoup
import requests

app = Flask(__name__)

def scrape():
    source = requests.get('https://www.basketball-reference.com/leagues/NBA_2023_per_game.html#per_game_stats::pts_per_g')
    source.raise_for_status()

    soup = BeautifulSoup(source.text, 'html.parser')
    
    player_data = soup.find('tbody').find_all('tr', class_="full_table")
    return player_data

def aggregate():
    player_list = []
    player_data = scrape()
    
    for player in player_data:
        stats = player.find_all('td')
        player_list.append({
            "Player": stats[0].text,
            "Position": stats[1].text,
            "Age": stats[2].text,
            "Team": stats[3].text,
            "Games Played": stats[4].text,
            "Games Started": stats[5].text,
            "Minutes Played Per Game": stats[6].text,
            "Field Goals Per Game": stats[7].text,
            "Field Goal Attempts Per Game": stats[8].text,
            "Field Goal Percentage": stats[9].text,
            "3-Point Field Goals Per Game": stats[10].text,
            "3-Point Field Goal Attempts Per Game": stats[11].text,
            "3-Point Field Goal Percentage": stats[12].text,
            "2-Point Field Goals Per Game": stats[13].text,
            "2-Point Field Goal Attempts Per Game": stats[14].text,
            "2-Point Field Goal Percentage": stats[15].text,
            "Effective Field Goal Percentage": stats[16].text,
            "Free Throws Per Game": stats[17].text,
            "Free Throw Attempts Per Game": stats[18].text,
            "Free Throw Percentage": stats[19].text,
            "Offensive Rebounds Per Game": stats[20].text,
            "Defensive Rebounds Per Game": stats[21].text,
            "Total Rebounds Per Game": stats[22].text,
            "Assists Per Game": stats[23].text,
            "Steals Per Game": stats[24].text,
            "Blocks Per Game": stats[25].text,
            "Turnovers Per Game": stats[26].text,
            "Personal Fouls Per Game": stats[27].text,
            "Points Per Game": stats[28].text
        })
    
    return jsonify(player_list)

@app.route("/members")
def members():
    return aggregate()

if __name__=='__main__':
    app.run(debug = True)
