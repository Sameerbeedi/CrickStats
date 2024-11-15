from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS
from mysql.connector import Error

app = Flask(__name__)
CORS(app)
# MySQL database connection configuration
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'CrickStats'
}

def create_connection():
    try:
        conn = mysql.connector.connect(**db_config)
        if conn.is_connected():
            print("Connected to MySQL database")
        return conn
    except Error as e:
        print(f"Error: {e}")
        return None

# Route to fetch data from Player table
@app.route('/players', methods=['GET'])
def get_players():
    conn = create_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Player;")
    players = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(players)

# Route to insert a new player
@app.route('/players', methods=['POST'])
def add_player():
    data = request.get_json()
    conn = create_connection()
    cursor = conn.cursor()
    insert_sql = """
    INSERT INTO Player (Player_ID, Player_Name, Player_Age, Player_Team, Player_Role, Player_Type, Player_Stats, Player_DOB)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s);
    """
    cursor.execute(insert_sql, (
        data['Player_ID'], data['Player_Name'], data['Player_Age'],
        data['Player_Team'], data['Player_Role'], data['Player_Type'],
        data['Player_Stats'], data['Player_DOB']
    ))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Player added successfully"}), 201

if __name__ == "__main__":
    app.run(debug=True)
