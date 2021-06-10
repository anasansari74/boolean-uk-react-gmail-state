import Header from './components/Header'

import initialEmails from './data/emails'

import './App.css'
import { useState } from 'react'

function App() {
  // Use initialEmails for state
  const [emails, setEmails] = useState(initialEmails)

  function toggleRead(targetEmail){
    // created updatedEmails
    const updatedEmails = [...emails]
    // get the same email by id
    const sameEmailId = emails.findIndex(email => email.id === targetEmail.id)
    // create a copy of the original email for state
    const originalEmail = emails[sameEmailId]
    // mutaute the changes on to the copy of the original email for state
    const updatedEmail = { ...originalEmail, read: !originalEmail.read}
    updatedEmails[sameEmailId] = updatedEmail
    // show the changes on the UI
    setEmails(updatedEmails)
  }

  function toggleStarred(targetEmail){
    // created updatedEmails
    const updatedEmails = [...emails]
    // get the same email by id
    const sameEmailId = emails.findIndex(email => email.id === targetEmail.id)
    // create a copy of the original email for state
    const originalEmail = emails[sameEmailId]
    // mutaute the changes on to the copy of the original email for state
    const updatedEmail = { ...originalEmail, starred: !originalEmail.starred}
    updatedEmails[sameEmailId] = updatedEmail
    // show the changes on the UI
    setEmails(updatedEmails)
  }

  function toggleReadShortVersion(targetEmail) {
    // original emails [m2, m3, m4, m5, m6] <<< m1 // This is what we start with
    // updated emails  [m2, m3, m8, m5, m6] <<< m7 // This is what we want to have at the end

    // create a new variable with the updated emails
    // map does this for us
    const updatedEmails = emails.map(function (email) {
      // we loop over each individual email
      // if the email's id matches our target email's id
      if (email.id === targetEmail.id) {
        // we get back an updated copy
        return { ...email, read: !email.read }
      }
      // otherwise, we get back the original email, untouched
      return email
    }) // [m2, m3, m4, m8, m6] <<< m7

    setEmails(updatedEmails)
  }

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            // onClick={() => {}}
          >
            <span className="label">Inbox</span>
            <span className="count">?</span>
          </li>
          <li
            className="item"
            // onClick={() => {}}
          >
            <span className="label">Starred</span>
            <span className="count">?</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={false}
              // onChange={() => {}}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        <ul>
        {emails.map(email => (
          <li key={email.id} className={email.read ? "email read" : "email unread"}>
            <input type="checkbox" onChange={()=>toggleRead(email)} checked={email.read} />
            <input type="checkbox" onChange={()=>toggleStarred(email)} className="star-checkbox" checked={email.starred} />
            <p className="sender">{email.sender}</p>
            <p className="title">{email.title}</p>
          </li>
        ))}
        </ul>
        </main>
    </div>
  )
}

export default App
