package com.example.plugins

import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.thymeleaf.Thymeleaf
import io.ktor.server.thymeleaf.ThymeleafContent
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver

fun Application.configureTemplating() {
    install(Thymeleaf) {
        setTemplateResolver(ClassLoaderTemplateResolver().apply {
            prefix = "pages/main/"
            suffix = ".html"
            characterEncoding = "utf-8"
        })
    }
    routing {
        get("/") {
            call.respond(
                ThymeleafContent(
                    "main",
                    mapOf("user" to ThymeleafUser(1, "user1"))
                )
            )
        }
    }
}

data class ThymeleafUser(val id: Int, val name: String)
