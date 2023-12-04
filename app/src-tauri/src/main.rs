// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::sync::Arc;

use rust_socketio::asynchronous::Client;
use tauri::async_runtime::{self, RwLock};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
async fn emit(
    client: tauri::State<'_, Arc<RwLock<Client>>>,
    event: String,
    messages: serde_json::Value,
) -> Result<(), ()> {
    client
        .read()
        .await
        .emit(event, messages)
        .await
        .map_err(|_| ())
}

fn main() {
    // let client = rust;
    let client = async_runtime::block_on(
        rust_socketio::asynchronous::ClientBuilder::new("http://localhost:3000")
            .transport_type(rust_socketio::TransportType::Websocket)
            .connect(),
    )
    .unwrap();

    tauri::Builder::default()
        .manage(Arc::new(RwLock::new(client)))
        .invoke_handler(tauri::generate_handler![emit])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
