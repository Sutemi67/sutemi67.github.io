package com.example.plugins

import com.example.repository.DataRepository
import com.example.repository.VisitorStats
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import java.util.*

/**
 * Configuration for application routing.
 * Defines endpoints for data transfer operations.
 */
fun Application.configureRouting(repository: DataRepository) {
    val visitorStats = VisitorStats()
    
    routing {
        // API routes for data operations
        route("/api") {
            // Visitor statistics endpoint
            get("/stats/visitors") {
                val sessionId = call.request.cookies["sessionId"] ?: UUID.randomUUID().toString()
                visitorStats.addVisitor(sessionId)
                call.response.cookies.append("sessionId", sessionId, maxAge = 3600)
                call.respond(visitorStats.getStats())
            }
            
            // Endpoint for receiving new data
            post("/data") {
                try {
                    val number = call.receive<Int>()
                    repository.addData(number)
                    call.respond(HttpStatusCode.Created, "Data successfully received")
                } catch (e: Exception) {
                    call.respond(
                        HttpStatusCode.BadRequest,
                        "Invalid data format. Please send a valid number."
                    )
                }
            }

            // Endpoint for retrieving latest data
            get("/data/latest") {
                val latestData = repository.getLatestData()
                if (latestData != null) {
                    call.respondText(latestData.toString())
                } else {
                    call.respond(
                        HttpStatusCode.NotFound,
                        "No data available"
                    )
                }
            }
        }
    }
} 