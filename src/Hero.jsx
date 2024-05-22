import React from 'react'

function Hero() {
    return (
        <><div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src="https://www.hellotars.com/blog/wp-content/uploads/2023/05/13744784_Mar-Business_1-1024x683.jpg" className="max-w-sm rounded-lg shadow-2xl" />
                <div>
                    <h1 className="text-5xl font-bold">AI-Powered Insights: Unlock ML Engineer Salary Secrets</h1>
                    <p className="py-6">Go beyond the graphs. Our AI assistant analyzes real-world data from Kaggle to reveal insightful answers to your specific questions.</p>
                    <button className="btn btn-primary">Get Started</button>
                </div>
            </div>
        </div></>
    )
}

export default Hero