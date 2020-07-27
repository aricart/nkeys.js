import { parse } from "https://deno.land/std@0.61.0/flags/mod.ts";
import { join, resolve, dirname, basename } from "https://deno.land/std@0.61.0/path/mod.ts";

const argv = parse(
  Deno.args,
  {
    alias: {
      "d": ["dir"],
    },
    string: ["dir"]
  },
);

const files: string[] = [];
argv.d = resolve(argv.d)
for await(const fn of Deno.readDir(argv.d)) {
  files.push(join(argv.d, fn.name));
}

const out = join(dirname(argv.d), "build");

files.every(async (fn) => {
  const data = await Deno.readFile(fn);
  const txt = new TextDecoder().decode(data);
  const lines = txt.split("\n");
  const mod = lines.map((l) => {
    return l.replace(".ts\";", "\";")
  });
  const ntxt = mod.join("\n");
  const target = join(out, basename(fn));
  await Deno.writeFile(target, new TextEncoder().encode(ntxt));
})

