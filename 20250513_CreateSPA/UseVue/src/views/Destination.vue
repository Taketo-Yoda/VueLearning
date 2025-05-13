<template>
    <h1>お届け先</h1>
    <inputName></inputName>
    <br/>
    <div>
        <label>お届け先住所</label>
        <inputAddress></inputAddress>
    </div>
    <br/>
    <button type="button" id="next-button" @click="() => $router.push({path: './Bill'})">次へ</button>
</template>

<script>
    import inputName from '../components/InputName.vue'
    import inputAddress from '../components/InputAddress.vue'
    export default {
        components: {
            inputName,
            inputAddress
        }
    }
</script>