import React, { useState } from "react";
import { Button } from "./components/Button/Button";
import { Input } from "./components/Input/Input";
import { Modal } from "./components/Modal/Modal";
import "./App.css";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.includes("@")) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setEmailError("");
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsModalOpen(true);
    }, 1500);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Accessible Components</h1>
        <p>
          WCAG 2.1 AA compliant · Keyboard accessible · Screen reader friendly
        </p>
      </header>

      <main className="demo-section">
        {/* Button Examples */}
        <section>
          <h2>Buttons</h2>
          <div className="component-demo">
            <Button variant="primary" size="small">
              Small
            </Button>
            <Button variant="primary" size="medium">
              Medium
            </Button>
            <Button variant="primary" size="large">
              Large
            </Button>
          </div>

          <div className="component-demo" style={{ marginTop: "16px" }}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="danger">Danger</Button>
          </div>

          <div className="component-demo" style={{ marginTop: "16px" }}>
            <Button loading>Processing...</Button>
            <Button disabled>Disabled</Button>
          </div>
        </section>

        {/* Input Examples */}
        <section>
          <h2>Form Inputs</h2>
          <form onSubmit={handleSubmit} className="form-demo">
            <Input
              label="Email address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
              helperText="We'll never share your email with anyone"
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helperText="Must be at least 8 characters"
              required
            />

            <Button
              type="submit"
              loading={isLoading}
              style={{ marginTop: "8px" }}
            >
              {isLoading ? "Submitting..." : "Submit Form"}
            </Button>
          </form>
        </section>

        {/* Modal Example */}
        <section>
          <h2>Modal Dialog</h2>
          <p
            style={{ marginBottom: "20px", color: "#737373", fontSize: "15px" }}
          >
            Accessible modal with focus trap and keyboard navigation
          </p>
          <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
        </section>
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Form Submitted Successfully"
        size="medium"
      >
        <p style={{ marginBottom: "20px", color: "#525252" }}>
          Thank you for submitting the form. Your information has been received
          and will be processed shortly.
        </p>
        <div
          style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}
        >
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
            Close
          </Button>
          <Button variant="primary">Continue</Button>
        </div>
      </Modal>
    </div>
  );
}

export default App;
