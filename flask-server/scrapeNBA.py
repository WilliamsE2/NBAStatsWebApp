from bs4 import BeautifulSoup
import requests, openpyxl

# Tutorial Used: https://www.youtube.com/watch?v=LCVSmkyB4v8&ab_channel=techTFQ

try:
    source = requests.get('https://www.basketball-reference.com/leagues/NBA_2023_per_game.html#per_game_stats::pts_per_g')
    source.raise_for_status()

    soup = BeautifulSoup(source.text, 'html.parser')
    
    player_list = soup.find('tbody').find_all('tr', class_="full_table")
    
    for player in player_list:
        stats = player.find_all('td')
        name = stats[0].text
        pos = stats[1].text
        age = stats[2].text
        team = stats[3].text
        games_played = stats[4].text
        games_started = stats[5].text
        mppg = stats[6].text
        fg = stats[7].text
        fg_attempt = stats[8].text
        fg_percentage = stats[9].text
        threep = stats[10].text
        threep_attempt = stats[11].text
        threep_percentage = stats[12].text
        twop = stats[13].text
        twop_attempt = stats[14].text
        twop_percentage = stats[15].text
        eff_fg_percentage = stats[16].text
        ft = stats[17].text
        ft_attempt = stats[18].text
        ft_percentage = stats[19].text
        off_rebounds = stats[20].text
        def_rebounds = stats[21].text
        tot_rebounds = stats[22].text
        ast = stats[23].text
        stl = stats[24].text
        blk = stats[25].text
        tov = stats[26].text
        fouls = stats[27].text
        pts = stats[28].text

except Exception as e:
    print(e)
