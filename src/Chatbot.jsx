import React from 'react'
import Chat from './Chat'

function Chatbot() {
  return (
    <>
          <div className="drawer drawer-end">
              <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content">
                  {/* Page content here */}
                  <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">Open drawer</label>
              </div>
              <div className="drawer-side">
                  <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                  <div className="menu p-4 w-120 min-h-full bg-base-200 text-base-content">
                      <Chat/>
                  </div>
              </div>
          </div>
    </>
  )
}

export default Chatbot