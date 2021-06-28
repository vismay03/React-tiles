import React from 'react'

export default function Stats({stats, counts, bgColor}) {
    return (
        <div class={`text-center stat-container px-10 pt-5 ${bgColor}`}>
            <p className="statsname text-white  opacity-0 ">{stats}</p>
            <h1 class="count px-5 py-2 text-6xl text-white -mb-6">{counts}</h1>
        </div>
    )
}
