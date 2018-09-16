/*
* This Will create game rooms if not existed and join one if there is room with
* only 1 player that is waiting for game start 
*/
function startGameRooms(player_master) {
    //loop on the rooms
    rooms_ref.once("value", snap => {
        current_room = snap.val();
        all_rooms = Object.keys(current_room);
        // var alreadyJoined = false;

        for (var i = 0; i < all_rooms.length; i++) {
            // if this room is full 
            if (Object.keys(current_room[all_rooms[i]].players).length >= 2) {
                //continue
                console.log("full players Room_id : " + all_rooms[i]);

            } else { //else if this room can have more player (did not have 2 players)
                //join this room
                console.log("You can join this room Room_id : " + all_rooms[i]);
                createRoom(all_rooms[i], player_master);
                // alreadyJoined = true;
                return;
            }
        }

        createRoom(null, player_master);
    });
}

/*
 * Create Room function to create room or join current room 
 */
function createRoom(room_id = null, Player) {
    //if room_id is null
    if (room_id == null) {
        //create room and add current player to the room
        player = {
            username: Player.username,
            color: Player.color,
            position_x: 10, //should be random in range of the field and not another player is in 
            position_y: 10, //should be random in range of the field and not another player is in
            score: 0
        }
        room = {
            width: "50px",
            height: "50px",
            time: 60
        }

        currentRoomId = rooms_ref.push(room).key;
        currentPlayerId = db.ref('rooms/' + currentRoomId + '/players').push(player).key;
        window.location = "snakegame.html";
    }
    else if (room_id != null) //else if room_id not empty 
    {
        isRoomExisted = false;
        rooms_ref.once("value", snap => {
            //Get all rooms and search for the current room
            all_rooms = Object.keys(snap.val());

            for (var i = 0; i < all_rooms.length; i++) {
                if (all_rooms[i] == room_id) {
                    isRoomExisted = true;
                }
            }
            console.log(isRoomExisted);

            if (isRoomExisted == 1) {
                console.log("adding User : " + username + " to the room : " + room_id);
                //add the current username to this room
                player = {
                    username: Player.username,
                    color: Player.color,
                    position_x: 10, //should be random in range of the field and not another player is in 
                    position_y: 10, //should be random in range of the field and not another player is in
                    score: 0
                }
                currentPlayerId = db.ref('rooms/' + room_id + '/players').push(player).key;
                window.location = "snakegame.html";
            }
            else {
                alert(" Please Enter Valid Room ID");
            }

        });
    }
}