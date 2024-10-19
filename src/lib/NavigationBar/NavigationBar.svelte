<script>
    // Components
    import Divider from "$lib/NavigationBar/Divider.svelte";

    const switchTheme = () => {
        const id = "tb:theme";
        const currentData = localStorage.getItem(id);
        if (currentData === "dark") {
            localStorage.setItem(id, "");
        } else {
            localStorage.setItem(id, "dark");
        }
        window.themeUpdated_();
        console.log(
            "switched theme to",
            currentData === "dark" ? "light" : "dark"
        );
    };
</script>

<div class="nav">
    <img
        src="/logos/outline.svg"
        alt="Logo"
        class="logo-margin"
        style="height: 40px;"
    />
    <button class="theme-switcher" on:click={switchTheme}>
        <img src="/images/theme_switcher.svg" alt="Theme Switcher" />
    </button>
    <Divider />
    <slot />
</div>

<style>
    :root {
        --nav-height: 3rem;
    }

    .nav {
        position: fixed;
        left: 0px;
        top: 0px;
        width: 100%;
        height: var(--nav-height);

        display: flex;
        flex-direction: row;
        align-items: center;

        background: #ff4b4b;
        border-radius: 0px 0px 16px 16px;
    }
    .logo-margin {
        margin: 0 6px;
        margin-left: 10px;
    }
    .theme-switcher {
        background: transparent;
        height: 100%;
        border: 0;
        margin: 0;
        cursor: pointer;
        transition: background 0.25s;
    }
    .theme-switcher:hover {
        background: rgba(0, 0, 0, 0.2);
    }
    .theme-switcher > img {
        width: 28px;
        height: 28px;
    }

    :global(body.dark) .theme-switcher:hover {
        background: rgba(255, 255, 255, 0.2);
    }

    :global(body.dark) .nav {
        background: #382020;
    }
</style>
