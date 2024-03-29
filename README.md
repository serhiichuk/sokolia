# Sokolia

Design - https://www.figma.com/file/3NJBMjkgBzzWBKPkaWlTDw/Note-Organizer?node-id=0%3A1&t=K5pE2d71gVMKulqz-0

Demo - https://serhiichuk.github.io/sokolia

## Get Started 

1. install `node.js` and `pnpm` if not installed
2. install packages by running `pnpm install`
3. start develop by running `pnpm --filter playground dev`

## Commands

`pnpm run ling` - Run linter for all packages

`pnpm run type-check` - Run type checks for all packages

`pnpm run precommit` - Run linter and type checks for all packages

### Playground

`pnpm --filter playground dev` - Start development server for playground

`pnpm --filter playground build` - Build playground for deploy

## Publish changes

1. Create new branch
2. Commit your changes and push
3. Create Pull Request
4. Review and merge

## TODO

### Editor

- [x] markdown support
- [ ] media elements support
- [ ] draw support

### Notes List

- [ ] Edit screen when creating a new note
- [x] Search by text
- [x] Sorting
- [ ] Filter by type

### Styling

- [ ] Markup and Style editor
- [ ] popup header
- [ ] popup footer
- [ ] popup notes list (margins, animations)
- [ ] popup notes item

### Ops

- [x] Setup auto deploy playground on GitHub Pages 
- [ ] Setup auto deploy playground on GitHub Pages for PRs
- [ ] Setup building extension
- [x] Setup linter
- [x] Setup type checks
