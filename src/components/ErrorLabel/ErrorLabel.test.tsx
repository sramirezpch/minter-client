import { render, screen } from "@testing-library/react";
import { ErrorLabel } from ".";

describe("Error Label", () => {
  beforeEach(() => {
    render(<ErrorLabel errorMessage="Test error message" />);
  });

  it("renders with the message from props", () => {
    expect(screen.getByText("Test error message")).toBeInTheDocument();
  });

  it("renders with classes defined in the component", () => {
    expect(screen.getByText("Test error message")).toHaveClass(
      "text-red-600 font-bold"
    );
  });
});
