# octometrics-action

Use [octometrics](https://github.com/kalverra/octometrics) in your GitHub Actions workflows to monitor detailed profiling information:

* CPU
* Memory
* Disk
* I/O

## Example usage

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

## Inputs

### `version`

**Optional** The specific version of [octometrics](https://github.com/kalverra/octometrics) to use, e.g. `v1.0.1`. Defaults to `latest` if not supplied. Can also use a path name like `./custom-binary` to use a custom built binary (useful for testing).

## Outputs

### `version`

The version of [octometrics](https://github.com/kalverra/octometrics) that was used.

### `path`

The path of the octometrics binary that was downloaded.

## Contributing

Use [pre-commit](https://pre-commit.com/) to make sure you're properly formatted and built.

```sh
pre-commit install
```
