## Branches

Recomenda-se seguir o padrão abaixo:

```
feat-escopo   nova funcionalidade
fix-escopo       correção de bug
chore-escopo     configuração, dependências, tarefas técnicas
```

Exemplos: `feat-indicators`, `fix-sheduler`, `chore-ci`

## Commits

Todo commit deve seguir o padrão inspirado no Conventional Commits:

```
tipo: descrição curta no imperativo
```

Tipos aceitos: `feat`, `fix`, `chore`, `refactor`, `style`, `docs`

Exemplos:

- `feat: adiciona Card de indicador`
- `fix: corrige cálculo do indicador de cirurgias`
- `chore: configura github actions`

## Fluxo de trabalho

1. Crie uma branch a partir da `main`. Obs: certifique-se de que a main está atualizada

2. Faça seus commits seguindo o padrão acima
3. Abra um PR para a `main`
4. O CI precisa passar para o merge ser liberado
