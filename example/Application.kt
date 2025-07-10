package com.example

import com.example.plugins.*
import com.example.repository.DataRepository
import io.ktor.server.application.*
import io.ktor.server.engine.embeddedServer
import io.ktor.server.netty.Netty

/**
 * Main entry point for the Ktor application.
 * Configures and starts the server with all necessary plugins.
 */
fun main(args: Array<String>) {
    embeddedServer(
        Netty,
        port = 6655, // This is the port on which Ktor is listening
        host = "0.0.0.0",
        module = Application::module
    ).start(wait = true)
}

/**
 * Configures the application with all necessary plugins and dependencies.
 * This is the main configuration point for the Ktor application.
 */
fun Application.module() {
    val repository = DataRepository()

    // Configure all necessary plugins
    configureSerialization()
    configureRouting(repository)
    configureSockets()
    configureTemplating()
    configureStaticContent()
} 