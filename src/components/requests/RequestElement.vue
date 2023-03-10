<template>
    <li class="p-4">
        <header>
            <h5>{{ email }}</h5>
            <small>{{ date }}</small>
        </header>
        <p class="ms-3 fw-normal">{{ message }}</p>
    </li>
</template>

<script>
    export default {
        props: ['email', 'message', 'date']
    }
</script>

<style lang="scss" scoped>
    li{
        border-bottom: 1px solid #33333365;
        header{
            display: flex;
            justify-content: space-between;
            align-items: center;
            h5{
                color: var(--first-color);
                font-size: 1.7rem;
                font-weight: bold;
            }
        }
    }
    li:last-child{
        border: none;
    }
</style>