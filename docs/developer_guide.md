# Developer Guide

This document outlines how to contribute to the **ai_travel** project.

## Requirements

The repository currently provides documentation and planning material for a travel concierge application. When code becomes available, we expect a standard Python development environment.

1. [Python](https://www.python.org/) 3.11 or later
2. [Poetry](https://python-poetry.org/) for dependency management

## Getting Started

1. Clone the repository:

```bash
git clone <repository-url>
cd ai_travel
```

2. Install dependencies:

```bash
poetry install
```

3. Run tests:

```bash
poetry run pytest
```

## Contributing Workflow

1. Create a new branch for your feature or bug fix.
2. Write tests for any new behavior.
3. Ensure `pytest` passes before submitting a pull request.
4. Keep pull requests focused and provide a clear description of the change.

We welcome improvements and suggestions! Feel free to open issues for discussion before you start implementing a larger feature.
