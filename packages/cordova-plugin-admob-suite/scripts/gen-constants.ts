import fs from 'fs'
import path from 'path'

const warnMessage =
  'THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.'

const Actions: { [index: string]: string } = {
  ready: 'ready',
  banner_show: 'banner_show',
  interstitial_prepare: 'interstitial_prepare',
  interstitial_show: 'interstitial_show',
}

const Events: { [index: string]: string } = {
  ready: 'admob.ready',
  interstitial_load: 'admob.interstitial.load',
  interstitial_load_fail: 'admob.interstitial.load_fail',
  interstitial_open: 'admob.interstitial.open',
  interstitial_close: 'admob.interstitial.close',
  interstitial_exit_app: 'admob.interstitial.exit_app',
}

function buildActionsJava(): string {
  const linesActions = Object.keys(Actions)
    .map(k => `    static final String ${k.toUpperCase()} = "${Actions[k]}";`)
    .join('\n')

  return `// ${warnMessage}
package admob.suite;

final class Actions {
${linesActions}
}
`
}

function buildConstantsTs(): string {
  const linesActions = Object.keys(Actions)
    .map(k => `  ${k} = '${Actions[k]}',`)
    .join('\n')

  const linesEvents = Object.keys(Events)
    .map(k => `  ${k} = '${Events[k]}',`)
    .join('\n')

  return `// ${warnMessage}
export const enum NativeActions {
  Service = 'AdMob',
${linesActions}
}

export const enum Events {
${linesEvents}
}
`
}

function main() {
  const l = [
    { filepath: 'src/android/Actions.java', f: buildActionsJava },
    { filepath: 'ts/constants.ts', f: buildConstantsTs },
  ]
  return Promise.all(
    l.map(({ filepath, f }) =>
      fs.promises.writeFile(path.join(__dirname, '..', filepath), f(), 'utf8'),
    ),
  )
}

main()
