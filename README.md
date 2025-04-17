# octometrics-action

Use [octometrics](https://github.com/kalverra/octometrics) in your GitHub
Actions workflows to monitor detailed profiling information:

- CPU
- Memory
- Disk
- I/O

## Example usage

```yaml
example-job:
  name: Example Job
  runs-on: ubuntu-latest
  steps:
    - name: Monitor
      uses: kalverra/octometrics-action
      with:
        job_name: Example Job # Required input to match API job data with runner job data
        version: 'latest'     # Optional input to dictate which version of octometrics to use
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }} # Optional, but highly recommended to prevent rate limiting
    - name: Checkout code
      uses: actions/checkout@v4
    - name: Run rest of workflow
      run: |
        echo "Hello World!"
```

## Inputs

### `job_name`

**Required** The name of the job that is being monitored. This is necessary to properly match job runner data with API data.
There is [currently no native way for GitHub Actions to do this for us](https://github.com/actions/toolkit/issues/550).

##### No-name example

```yaml
example-job:
  runs-on: ubuntu-latest
  steps:
    - name: Monitor
      uses: kalverra/octometrics-action
      with:
        job_name: example-job
```

#### Name example

```yaml
example-job:
  runs-on: ubuntu-latest
  name: Example Job Name
  steps:
    - name: Monitor
      uses: kalverra/octometrics-action
      with:
        job_name: Example Job Name
```

#### Matrix example

```yaml
example-job:
  strategy:
    matrix:
      value: ["other", "matrix", "names"]
  runs-on: ubuntu-latest
  name: Example Job Name ${{ matrix.value }}
  steps:
    - name: Monitor
      uses: kalverra/octometrics-action
      with:
        job_name: Example Job Name ${{ matrix.value }}
```

### `version`

**Optional** The specific version of
[octometrics](https://github.com/kalverra/octometrics) to use, e.g. `v1.0.0`.
Defaults to `latest` if not supplied. Can also use a path name like
`./custom-binary` to use a custom built binary (useful for testing).

## Outputs

### `version`

The version of [octometrics](https://github.com/kalverra/octometrics) that was
used.

### `path`

The path of the octometrics binary that was downloaded.

## Contributing

Use [pre-commit](https://pre-commit.com/) to make sure you're properly formatted
and built.

```sh
pre-commit install
```
