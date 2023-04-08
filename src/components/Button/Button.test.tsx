import { Button } from "./index";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Button component", () => {
  const spanText = "Test span";
  const className = "rounded-lg px-4 py-1";
  const onClick = jest.fn();

  beforeEach(() => {
    render(
      <Button onClick={onClick}>
        <span>{spanText}</span>
      </Button>
    );
  });

  test("has the right span text", () => {
    expect(screen.getByText(spanText)).toBeInTheDocument();
  });

  test("has the default classNames", () => {
    for (const classes of className.split(" ")) {
      expect(screen.getByRole("button")).toHaveClass(classes);
    }
  });

  describe("Button component behavior", () => {
    test("executes a function when pressed", async () => {
      await userEvent.click(screen.getByRole("button"));

      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });
});
