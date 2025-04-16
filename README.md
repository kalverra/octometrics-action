# octometrics-action

Use [octometrics](https://github.com/kalverra/octometrics) in your GitHub Actions workflows

## Usage

```yaml
example-job:
    name: Example Job
    runs-on: ubuntu-latest
    steps:
        - name: Monitor
          uses: kalverra/octometrics-action
          with:
            version: 'latest' # Optional input to dictate which version of octometrics to use
          env:
            GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }} # Prevent rate limiting
        - name: Checkout code
          uses: actions/checkout@v4
        - name: Run rest of workflow
          run: |
            echo "Hello World!"
```

## Contributing

Use [pre-commit](https://pre-commit.com/) to make sure you're properly formatted and built.

```sh
pre-commit install
```
