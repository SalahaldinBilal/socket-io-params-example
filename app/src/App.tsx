import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { io } from "socket.io-client";

function App() {
  const client = io("http://localhost:3000", {
    transports: ['websocket'],
  });

  async function greet() {
    client.emit("js-client", 1, 3, "can", "send", "multiple", "arguments");
    await new Promise((res, _) => setTimeout(res, 100));
    await invoke("emit", { event: "rust-client", messages: ["technically", "works", "but", "only", "one", "arg"] });
  }

  return (
    <div class="container">
      <h1>Welcome to Tauri!</h1>

      <div class="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" class="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" class="logo tauri" alt="Tauri logo" />
        </a>
      </div>

      <p>Click on the Tauri, Vite, and Solid logos to learn more.</p>

      <form
        class="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >

        <button type="submit">Emit</button>
      </form>
    </div>
  );
}

export default App;
