import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "../components/Footer";

test("It renders a footer ", async () => {
  render(<Footer />);
});

test("It contains a Toolbox text", async () => {
  render(<Footer />);
  expect(screen.getByText("Toolbox")).toBeInTheDocument();
});
