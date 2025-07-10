package com.example.plugins

import io.ktor.server.application.*
import io.ktor.server.http.content.*
import io.ktor.server.routing.*

/**
 * Configures static content serving for the application.
 * Serves static files from the resources directory.
 */
fun Application.configureStaticContent() {
    routing {
        staticResources("/", "pages/main")
    }
} 