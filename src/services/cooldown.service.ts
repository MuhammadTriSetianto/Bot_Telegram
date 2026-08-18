export const CooldownService = (timer: number) => {
  const cooldown = new Map<number, number>();

  return async (ctx: any, next: any) => {
    const userId = ctx.from?.id;

    if (!userId) {
      return;
    }

    const now = Date.now();
    const lastTime = cooldown.get(userId) ?? 0;

    const elapsed = now - lastTime;
    const cooldownTime = timer * 1000;

    if (elapsed < cooldownTime) {
      const remaining = Math.ceil(
        (cooldownTime - elapsed) / 1000
      );

      await ctx.reply(
        `⏳ Tunggu ${remaining} detik sebelum menggunakan lagi.`
      );

      return;
    }

    cooldown.set(userId, now);

    await next();
  };
};