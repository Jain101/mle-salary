import React from 'react'

function Hero() {
    return (
        <><div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src="https://www.hellotars.com/blog/wp-content/uploads/2023/05/13744784_Mar-Business_1-1024x683.jpg" className="max-w-sm rounded-lg shadow-2xl" />
                <div>
                    <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-700 md:text-5xl lg:text-6xl"><span class="text-blue-600 dark:text-blue-500">AI-Powered</span> Insights: Unlock ML Engineer Salary Secrets</h1>
                    <p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Go beyond the graphs. Our AI assistant analyzes real-world data from Kaggle to reveal insightful answers to your specific questions.</p>

                    {/* <Link to={'/chatbot'}><button className="btn btn-primary">Chat with Maya</button></Link> */}
                </div>
            </div>
        </div></>
    )
}

export default Hero