import { ProfileDiv , SideText , SideTitle} from './Styles';

function SideDiv({ info })
{
    return <ProfileDiv>
        <SideTitle>Welcome to StackOver4s</SideTitle>
        <div>• • •</div>
        <SideText>In here you can post any questions, ideas, tips and interesting links to videos or articles you found and want to share with everyone</SideText>
        {info ? <>
        <div>• • •</div>
        <SideText>This site has {info.usersCount} registered users and {info.postsCount} posts</SideText>
        <div>• • •</div>
        <SideText>With {info.tagsArray[0].tag} ({info.tagsArray[0].count}) , {info.tagsArray[1].tag} ({info.tagsArray[1].count}) and {info.tagsArray[2].tag} ({info.tagsArray[2].count}) being the most trending tags</SideText>
        </> : null}
        </ProfileDiv>
}

export default SideDiv;