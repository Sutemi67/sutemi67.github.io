package com.example.repository

/**
 * Repository for managing data transfer operations.
 * Stores and retrieves numeric data in memory.
 */
class DataRepository {
    private val storedData = mutableListOf<Int>()

    /**
     * Adds new data to the repository.
     * @param data The numeric value to store
     */
    fun addData(data: Int) {
        storedData.add(data)
        println("Data received and stored: $data")
    }

    /**
     * Retrieves the most recently stored data.
     * @return The latest stored value, or null if no data is available
     */
    fun getLatestData(): Int? = storedData.lastOrNull()
} 