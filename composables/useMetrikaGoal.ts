// composables/useMetrikaGoal.ts

/** JavaScript-event goal identifiers; each must also be created in Metrika */
export type MetrikaGoal = 'vk_login' | 'album_check' | 'download_start' | 'download_done'

/**
 * Returns a function that reports a Yandex Metrika goal. A no-op when the
 * Metrika module is disabled (no NUXT_PUBLIC_YANDEX_METRIKA_ID) or in dev.
 */
export function useMetrikaGoal() {
    const { $ym } = useNuxtApp()
    return (goal: MetrikaGoal) => {
        if (typeof $ym === 'function') {
            $ym('reachGoal', goal)
        }
    }
}
