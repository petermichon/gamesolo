type Positions = [x: number, y: number][];

abstract class WebSocketter {
  private static sockets: Set<WebSocket>;

  private static playersPos: Positions;
  private static rocksPos: Positions;

  public static setWebsocket(sockets: Set<WebSocket>) {
    WebSocketter.sockets = sockets;
  }

  public static setPlayersPositions(position: Positions) {
    WebSocketter.playersPos = position;
  }

  public static setRocksPositions(position: Positions) {
    WebSocketter.rocksPos = position;
  }

  public static sendPositionsToClients() {
    // ---
    // Will be awkward when adding new archetypes. move this to a function defined in main and referenced in class ? dynamically get all positions from all archetypes (the code seems to have a simple pattern) ?
    const nbPlayers = [WebSocketter.playersPos.length];
    const nbRocks = [WebSocketter.rocksPos.length];
    const players = WebSocketter.playersPos.flat();
    const rocks = WebSocketter.rocksPos.flat();
    const array = nbPlayers.concat(players).concat(nbRocks).concat(rocks);
    // ---
    // ---
    // Move this to Handler class ?
    const data = new Float32Array(array);
    for (const socket of WebSocketter.sockets) {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(data);
      }
    }
    // ---
  }
}

// in main
// WebSocketter.setWebsocket(sockets)
// WebSocketter.setPlayersPositions(archetypes.players.position)
// WebSocketter.setRocksPositions(archetypes.rocks.position)

export { WebSocketter };
