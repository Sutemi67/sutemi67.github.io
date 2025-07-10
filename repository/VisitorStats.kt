package com.example.repository

import java.time.LocalDateTime
import java.util.concurrent.ConcurrentHashMap
import java.util.concurrent.atomic.AtomicInteger

class VisitorStats {
    private val onlineUsers = ConcurrentHashMap<String, LocalDateTime>()
    private val monthlyVisits = AtomicInteger(0)

    fun addVisitor(sessionId: String) {
        onlineUsers[sessionId] = LocalDateTime.now()
        monthlyVisits.incrementAndGet()
        println("New visitor has come..... at ${LocalDateTime.now()}")
    }

    fun cleanupOldSessions() {
        val now = LocalDateTime.now()
        onlineUsers.entries.removeIf { (_, lastSeen) ->
            now.minusMinutes(5).isAfter(lastSeen)
        }
    }

    fun getStats(): Map<String, Int> {
        cleanupOldSessions()
        return mapOf(
            "onlineUsers" to onlineUsers.size,
            "monthlyUsers" to monthlyVisits.get()
        )
    }
} 