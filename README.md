# Concerto Tools
Model converters and tools for [Concerto](https://github.com/accordproject/concerto/) format model files.

## Install

```
npm install -g @accordproject/concerto-tools
```

## Code Generation

The code generators take an array of local CTO files, download any external dependencies (imports) and then convert all the model
in the `ModelManager` to the target format.

### Go Lang

```
node cli.js generate --ctoFiles modelfile.cto --format Go
```

### Plant UML

```
node cli.js generate --ctoFiles modelfile.cto --format PlantUML
```

### Typescript

```
node cli.js generate --ctoFiles modelfile.cto --format Typescript
```

### Java

```
node cli.js generate --ctoFiles modelfile.cto --format Java
```

### JSONSchema

```
node cli.js generate --ctoFiles modelfile.cto --format JSONSchema
```

### XMLSchema

```
node cli.js generate --ctoFiles modelfile.cto --format XMLSchema
```