// ============================================
// SECURITY KITTY PERSONALITY QUIZ
// Categorized into 4 groups for better, funnier reports
// ============================================

const questions = [
    {
        id: 1,
        text: "Your ex sends the 'you up?' at 2am after the sesh. Your response?",
        options: [
            { text: "Block them immediately. I'm grand, thanks.", category: "Mysterious", points: { "Mysterious": 4, "Cool": 2 } },
            { text: "Reply with a meme and go back to sleep", category: "Sound", points: { "Sound": 3, "Cool": 2 } },
            { text: "Send them a voice note explaining exactly why they're a dose", category: "Drama", points: { "Drama": 4, "Mysterious": 2 } },
            { text: "Leave them on read and screenshot for the WhatsApp group", category: "Drama", points: { "Drama": 3, "Sound": 2 } },
            { text: "Give in and meet up (you know you shouldn't but here we are)", category: "Sound", points: { "Sound": 4, "Drama": 2 } }
        ]
    },
    {
        id: 2,
        text: "Your friend group's biggest red flag is:",
        options: [
            { text: "They're all dating each other's exes like it's a game of musical chairs", category: "Drama", points: { "Drama": 4, "Sound": 1 } },
            { text: "They're all selling Herbalife and won't stop messaging you about it", category: "Cool", points: { "Cool": 4, "Mysterious": 1 } },
            { text: "They think 'we should meet up' means you actually have to meet up", category: "Sound", points: { "Sound": 4, "Cool": 1 } },
            { text: "They screenshot your Instagram stories and send them to the group chat", category: "Mysterious", points: { "Mysterious": 4, "Drama": 1 } }
        ]
    },
    {
        id: 3,
        text: "Your ideal Friday night involves:",
        options: [
            { text: "Staying in, ordering a chipper, and watching Love Island", category: "Sound", points: { "Sound": 4, "Cool": 2 } },
            { text: "Going out on the sesh and causing absolute chaos (respectfully)", category: "Drama", points: { "Drama": 4, "Mysterious": 2 } },
            { text: "Planning your revenge on everyone who's done you dirty", category: "Mysterious", points: { "Mysterious": 4, "Drama": 2 } },
            { text: "Meditating and manifesting your best life (while eating chocolate)", category: "Cool", points: { "Cool": 4, "Sound": 2 } }
        ]
    },
    {
        id: 4,
        text: "Your relationship red flag detector is set to:",
        options: [
            { text: "Maximum sensitivity - I see red flags in everything, even in Tesco", category: "Mysterious", points: { "Mysterious": 4, "Cool": 1 } },
            { text: "Completely broken - I see red flags as 'character building experiences'", category: "Drama", points: { "Drama": 4, "Sound": 1 } },
            { text: "What red flags? I'm colourblind to toxicity, sure it's grand", category: "Sound", points: { "Sound": 4, "Cool": 1 } },
            { text: "Selective - I only see them in other people's relationships, not mine", category: "Drama", points: { "Drama": 3, "Sound": 2 } }
        ]
    },
    {
        id: 5,
        text: "When someone says 'you've changed', you think:",
        options: [
            { text: "Good. I was working on that, thanks for noticing", category: "Cool", points: { "Cool": 4, "Mysterious": 1 } },
            { text: "Yeah, I went to therapy and got boundaries now, it's class", category: "Cool", points: { "Cool": 4, "Sound": 1 } },
            { text: "I haven't changed, you just finally opened your eyes", category: "Mysterious", points: { "Mysterious": 4, "Drama": 1 } },
            { text: "I'm the same, you're just paying attention now instead of being a dose", category: "Drama", points: { "Drama": 4, "Mysterious": 1 } }
        ]
    },
    {
        id: 6,
        text: "Your ex's new partner slides into your DMs. You:",
        options: [
            { text: "Block them both immediately and get on with your life", category: "Mysterious", points: { "Mysterious": 4, "Cool": 1 } },
            { text: "Reply with 'who's this?' even though you know exactly who it is", category: "Sound", points: { "Sound": 4, "Cool": 1 } },
            { text: "Screenshot everything and send to the WhatsApp group for a full analysis", category: "Drama", points: { "Drama": 4, "Sound": 1 } },
            { text: "Send them your therapist's number and wish them the best of luck", category: "Cool", points: { "Cool": 4, "Sound": 1 } }
        ]
    },
    {
        id: 7,
        text: "Your WhatsApp group chat name is probably:",
        options: [
            { text: "Therapy Session (but make it chaotic)", category: "Drama", points: { "Drama": 4, "Sound": 1 } },
            { text: "Emotional Support Gals", category: "Sound", points: { "Sound": 4, "Cool": 1 } },
            { text: "No Red Flags Here (we're lying through our teeth)", category: "Drama", points: { "Drama": 3, "Sound": 2 } },
            { text: "The Blocked List", category: "Mysterious", points: { "Mysterious": 4, "Cool": 1 } },
            { text: "The Coven (we're all a bit witchy)", category: "Mysterious", points: { "Mysterious": 4, "Drama": 1 } },
            { text: "Girls Who Lunch (but we never actually lunch)", category: "Cool", points: { "Cool": 3, "Mysterious": 1 } }
        ]
    },
    {
        id: 8,
        text: "Your approach to conflict resolution:",
        options: [
            { text: "Avoid it until it explodes dramatically like a can of Coke that's been shaken", category: "Drama", points: { "Drama": 4, "Sound": 1 } },
            { text: "Talk it out like mature adults (sure, who am I kidding?)", category: "Sound", points: { "Sound": 4, "Cool": 1 } },
            { text: "Cut them off immediately, no explanation needed, they know what they did", category: "Mysterious", points: { "Mysterious": 4, "Cool": 1 } },
            { text: "Send them a passive-aggressive meme and hope they get the hint", category: "Drama", points: { "Drama": 3, "Sound": 2 } },
            { text: "Confront them directly and have it out - no holding back", category: "Drama", points: { "Drama": 5, "Mysterious": 2 } }
        ]
    },
    {
        id: 9,
        text: "Your energy level on a scale of 1-10:",
        options: [
            { text: "11 - I'm powered by chaos, caffeine, and the sesh", category: "Drama", points: { "Drama": 4, "Mysterious": 1 } },
            { text: "3 - I'm conserving energy for important things (like naps and chocolate)", category: "Cool", points: { "Cool": 4, "Sound": 1 } },
            { text: "7 - I'm grand, but also wrecked", category: "Sound", points: { "Sound": 4, "Cool": 1 } },
            { text: "Variable - Depends on who's asking and what's in it for me", category: "Mysterious", points: { "Mysterious": 4, "Drama": 1 } }
        ]
    },
    {
        id: 10,
        text: "Your toxic trait is:",
        options: [
            { text: "I hold grudges like they're collectibles and I'm not letting go", category: "Mysterious", points: { "Mysterious": 4, "Drama": 1 } },
            { text: "I'm too sound and people walk all over me", category: "Sound", points: { "Sound": 4, "Cool": 1 } },
            { text: "I create drama where there is none, it's a talent really", category: "Drama", points: { "Drama": 4, "Sound": 1 } },
            { text: "I'm emotionally unavailable but expect others to be an open book", category: "Cool", points: { "Cool": 4, "Mysterious": 1 } },
            { text: "I'm a people pleaser who can't say no (even when I should)", category: "Sound", points: { "Sound": 4, "Cool": 1 } },
            { text: "I'm always right and I'll die on that hill", category: "Mysterious", points: { "Mysterious": 4, "Drama": 1 } }
        ]
    },
    {
        id: 11,
        text: "Someone cuts the queue in front of you. You:",
        options: [
            { text: "Say nothing but give them the death stare for the next 10 minutes", category: "Mysterious", points: { "Mysterious": 3, "Cool": 1 } },
            { text: "Politely say 'excuse me, the queue is back there' with a smile", category: "Sound", points: { "Sound": 3, "Cool": 1 } },
            { text: "Loudly announce 'some people have no manners' to everyone around", category: "Drama", points: { "Drama": 4, "Sound": 1 } },
            { text: "Just let it go, sure it's grand, life's too short", category: "Cool", points: { "Cool": 3, "Sound": 1 } },
            { text: "Call them out aggressively and make a scene (they started it)", category: "Drama", points: { "Drama": 5, "Mysterious": 2 } },
            { text: "Push past them and cut in front of them (eye for an eye)", category: "Mysterious", points: { "Mysterious": 5, "Drama": 2 } }
        ]
    },
    {
        id: 12,
        text: "Your ideal night out involves:",
        options: [
            { text: "A few drinks in the local, good craic, home by midnight", category: "Sound", points: { "Sound": 4, "Cool": 1 } },
            { text: "A full sesh, dancing until 3am, getting a chipper on the way home", category: "Drama", points: { "Drama": 4, "Mysterious": 1 } },
            { text: "Staying in with a bottle of wine and Love Island", category: "Sound", points: { "Sound": 3, "Cool": 2 } },
            { text: "Whatever the group wants, I'm easy", category: "Sound", points: { "Sound": 3, "Cool": 2 } },
            { text: "A mysterious night out where no one knows what we're doing", category: "Mysterious", points: { "Mysterious": 4, "Drama": 1 } },
            { text: "A sophisticated night out, I have standards", category: "Mysterious", points: { "Mysterious": 3, "Cool": 2 } }
        ]
    }
];

// Category groups with their styles
const categoryGroups = {
    "Drama": {
        name: "The Drama Queens",
        emoji: "💅",
        description: "Extra, Bold, Main Character Energy",
        styles: [
            { name: "Drama Queen", emoji: "💅", image: "STYLES/Drama Queen.png", description: "The Main Character" },
            { name: "Violet Voltage", emoji: "⚡", image: "STYLES/Violet Voltage.png", description: "The Energizer" },
            { name: "Welcome to the Jungle", emoji: "🌴", image: "STYLES/Welcome to the Jungle.png", description: "The Wild Card" },
            { name: "Midnight Mischief", emoji: "🌙", image: "STYLES/Midnight Mischief.png", description: "The Night Owl" }
        ],
        report: {
            personality: "Honey, you ARE the drama. You don't create it, you ARE it. Your life is a reality TV show and you're the star. You have strong opinions, stronger reactions, and you're not afraid to let everyone know how you feel about everything. You're the friend who makes everything an event, and honestly? We love that for you. You're basically a walking, talking Netflix series that everyone's subscribed to.",
            relationships: "Your relationships are... eventful. You feel things deeply and you're not afraid to express it. Your exes probably have stories, but so do you - and yours are better. You're passionate, intense, and you bring the energy (whether people asked for it or not). You don't do casual - everything is intense and meaningful. You're the partner who turns a simple 'good morning' text into a 47-page analysis of your relationship status. Your WhatsApp group chat is probably called 'Therapy Session' or 'Emotional Support Gals' because you screenshot everything and analyse every text message.",
            friendGroup: "You're the friend who's always planning something. Weekend trip? You're in. Last-minute sesh? Let's go. You bring the energy and the spontaneity, and your friends love you for it (even when you're a lot). You're the friend who makes group chats interesting and keeps everyone entertained with your life updates. You're basically the group's entertainment director, and we're all here for it.",
            redFlags: "Your red flags? You create drama where there is none (it's a talent, really), you've probably had a public meltdown in a Tesco, and you turn every minor inconvenience into a three-act play. You're so extra that you make extra look normal. You probably have a Google Doc of all your exes' wrongdoings, and you reference it in arguments. You have the attention span of a goldfish on Red Bull, and you make plans at 3am and actually follow through with them. But honestly? We wouldn't have you any other way - life would be boring without you.",
            whyMatch: "The Drama Queens category matches your energy because you're not afraid to be extra. You're bold, you're expressive, and you own your energy. This category is for people who know they're the main character and aren't sorry about it. You deserve a Security Kitty that's as dramatic and fabulous as you are.",
            purchasePrompt: "Pick your perfect Drama Queen Security Kitty below - each one matches your extra energy in its own way!"
        }
    },
    "Sound": {
        name: "The Sound Ones",
        emoji: "😸",
        description: "Kind, Balanced, Sweet But Strong",
        styles: [
            { name: "Hello Kitty", emoji: "😸", image: "STYLES/Hello Kitty.png", description: "The Sweetheart" },
            { name: "Sugar Punch", emoji: "🐱", image: "STYLES/Sugar Punch.png", description: "The Sweet & Sassy" },
            { name: "Silent Alarm", emoji: "🔇", image: "STYLES/Silent Alarm.png", description: "The Observant" },
            { name: "Blue Steel", emoji: "💎", image: "STYLES/Blue Steel.png", description: "The Unbreakable" }
        ],
        report: {
            personality: "You're the friend everyone goes to for comfort. You're sound, you're kind, and you see the best in people (even when they don't deserve it). You're the human equivalent of a warm hug and a cup of tea. You're the friend who's always there, always sound, and always ready to listen. You're basically a human therapy dog, but for your friends - and you don't even charge for it.",
            relationships: "You're probably too sound for your own good. You give people second, third, and fourth chances because you believe in the good in everyone. Your red flag detector might be broken, but your heart is in the right place. You see the best in people, even when they're being a dose. You're the partner who says 'maybe they're just having a bad day' about someone who's clearly a walking red flag. You're the perfect balance of sweet and strong - you're caring and supportive, but you also know your worth and you're not afraid to stand up for yourself.",
            friendGroup: "You're the emotional support friend. People come to you with their problems, and you're always there to listen. You're the one who remembers birthdays, sends encouraging texts, and makes everyone feel seen. You're the friend who's always checking in and making sure everyone's grand. You're basically the group's emotional support animal, and we appreciate you. You're the friend who's always there, but you also call people out when they need it - you're sweet enough to be approachable, but strong enough to be respected.",
            redFlags: "Your red flags? You're so sound that you let people walk all over you, you give second chances to people who don't deserve a first one, and you probably have a collection of 'it's fine' texts that are definitely not fine. You're so nice that you'd probably apologise to a door if you walked into it. You're a people pleaser who can't say no (even when you should), and you're so sweet that you'd probably apologise for someone else's mistake. But sure, at least you're sound, right? And honestly? The world needs more people like you - even if you need to work on your boundaries (but that's a problem for another day).",
            whyMatch: "The Sound Ones category matches your vibe because you're genuinely sound and you bring positivity wherever you go. This category is for people who spread kindness and make the world a little brighter. You're the perfect blend of sweet and strong - kind but not weak, caring but not a doormat.",
            purchasePrompt: "Pick your perfect Sound One Security Kitty below - each one matches your kind but strong energy in its own way!"
        }
    },
    "Cool": {
        name: "The Cool & Collected",
        emoji: "❄️",
        description: "Calm, Zen, Got It Together",
        styles: [
            { name: "Cold Snap", emoji: "❄️", image: "STYLES/Cold Snap.png", description: "The Cool & Collected" },
            { name: "Garden Party", emoji: "🌺", image: "STYLES/Garden Party.png", description: "The Blooming" },
            { name: "Mint Condition", emoji: "🌿", image: "STYLES/Mint Condition.png", description: "The Zen Master" },
            { name: "Total Whiteout", emoji: "⚪", image: "STYLES/Total Whiteout.png", description: "The Minimalist" }
        ],
        report: {
            personality: "You're cool, calm, and collected. You don't get worked up easily, and you handle everything with a level head. You're the friend who stays calm in a crisis and helps everyone else keep their cool. You're the one who says 'sure, it'll be grand' and actually means it. You're basically a human ice cube, but make it zen. You've got your life together (or at least you're working on it), and you're in your wellness/growth era.",
            relationships: "You're emotionally intelligent and you don't play games. Your relationships are stable and mature because you communicate clearly and you don't do drama. You're the partner everyone wants because you're steady, you're reliable, and you don't do unnecessary drama. You're the one who says 'let's talk about this like adults' and actually means it. You're working on yourself, and you're attracting better relationships because of it - you're setting boundaries, communicating better, and not settling for less than you deserve.",
            friendGroup: "You're the voice of reason in your friend group. When everyone else is panicking, you're the one who stays calm and figures things out. You're reliable, you're steady, and people trust you. You're the friend who keeps everyone grounded when things get chaotic. You're basically the group's therapist, but make it free. You're the one who reminds everyone to breathe, to take care of themselves, and to prioritise their mental health.",
            redFlags: "Your red flags? You're so calm that you make glaciers look emotional, you probably have a collection of 'it's fine' texts that are definitely not fine, and you're so collected that you make robots look chaotic. You're so emotionally unavailable that you make walls look open. You're so zen that you make meditation look chaotic, and you're so in your wellness era that you make wellness look unhealthy. You're so focused on self-care that you make self-care look like work. But sure, at least you're stable, right? And honestly? We need people like you to balance out the chaos.",
            whyMatch: "The Cool & Collected category matches your personality because you're cool under pressure, you're emotionally mature, and you bring stability wherever you go. This category is for people who keep their cool no matter what, who are in their growth/wellness era, and who value simplicity and peace.",
            purchasePrompt: "Pick your perfect Cool & Collected Security Kitty below - each one matches your zen energy in its own way!"
        }
    },
    "Mysterious": {
        name: "The Mysterious & Independent",
        emoji: "🖤",
        description: "Dark, Intuitive, Do Their Own Thing",
        styles: [
            { name: "The BlackEye", emoji: "🖤", image: "STYLES/The BlackEye.png", description: "The Unbothered" },
            { name: "Purple Reign", emoji: "👑", image: "STYLES/Purple Reign.png", description: "The Royalty" },
            { name: "Witchy Woman", emoji: "🔮", image: "STYLES/Witchy Woman.png", description: "The Mystical" },
            { name: "BlackCat", emoji: "🐈‍⬛", image: "STYLES/BlackCat.png", description: "The Independent" }
        ],
        report: {
            personality: "You're the friend who's done with everyone's nonsense. You've seen it all, heard it all, and you're not here for any of it. You're independent, mysterious, and you do your own thing. You're like a cat - you come and go as you please, and you don't need anyone's approval. You're confident, you're self-sufficient, and you're unapologetically yourself. You're basically a human 'no' button, and honestly? We respect it. You're mysterious, intuitive, and you have that 'I know things' vibe - you're the friend who reads tarot cards, knows everyone's birth chart, and is always right about people.",
            relationships: "Your relationship red flag detector is basically a nuclear warning system. You spot toxicity from a mile away and you're not afraid to cut people off. Your exes probably still think about you, but you've moved on to better things (or just moved on to being alone, which is also grand). You don't do second chances unless they've genuinely changed, and even then, you're sceptical. You're not looking for someone to complete you - you're already complete, and you want someone who adds to your life. You set high standards and you don't settle. You're intuitive about people and relationships - you can read energy, spot red flags early, and trust your gut.",
            friendGroup: "Your friend group knows not to mess with you. You're the one who calls out BS when you see it, and people respect that (or they're scared of you, which works too). You're loyal to those who earn it, but you don't suffer fools. You're the friend who says 'I told you so' but in a supportive way. You're basically the group's bouncer, but for toxic people. You're the friend who gives the best advice because you see things others don't - you're intuitive, wise, and people come to you for guidance.",
            redFlags: "Your red flags? You hold grudges like they're Olympic medals, you've blocked more people than you've dated, and you see red flags in someone ordering a decaf coffee. You're so done with nonsense that you've basically become a human red flag detector yourself. You probably have a spreadsheet of everyone who's wronged you, and honestly? We're not mad about it. You're so independent that you make independence look dependent, and you're so mysterious that you make mystery look obvious. You're so confident that you're always right (even when you're wrong), and you're so intuitive that you make psychics look clueless. But sure, at least you know your worth, right?",
            whyMatch: "The Mysterious & Independent category matches your energy because you're not here to play games. You're serious, you're done with drama, and you know your worth. This category is for people who've been through it and came out stronger, who trust their intuition, and who are perfectly fine on their own.",
            purchasePrompt: "Pick your perfect Mysterious & Independent Security Kitty below - each one matches your unbothered energy in its own way!"
        }
    }
};

let currentQuestion = 0;
let answers = {};
let categoryScores = {};

function initQuiz() {
    // Check if there's a result in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const resultCategory = urlParams.get('result');
    
    if (resultCategory && categoryGroups[resultCategory]) {
        // Show the result directly
        displayResult(resultCategory);
    } else {
        // Start the quiz normally - scroll to top to show hero section
        showQuestion(0);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function displayResult(matchedCategory) {
    const category = categoryGroups[matchedCategory];
    const container = document.getElementById('questionContainer');
    const resultContainer = document.getElementById('resultContainer');
    
    container.style.display = 'none';
    resultContainer.classList.add('show');
    
    // Set progress to 100%
    document.getElementById('progressBar').style.width = '100%';
    
    resultContainer.innerHTML = `
        <div class="result-header">
            <h2 class="result-title">Your Security Kitty Category</h2>
            <p class="result-subtitle">Based on your questionable life choices and personality traits</p>
        </div>
        
        <div class="result-card">
            <div class="matched-style">
                <div class="style-emoji" style="font-size: 4rem;">${category.emoji}</div>
                <div class="style-name" style="font-size: 2.5rem;">${category.name}</div>
                <p style="color: rgba(255, 255, 255, 0.7); font-size: 1.25rem; font-weight: 600;">${category.description}</p>
            </div>
            
            <div class="psych-report">
                <div class="report-section">
                    <div class="report-title">
                        <span>🧠 Personality Analysis</span>
                    </div>
                    <div class="report-text">${category.report.personality}</div>
                </div>
                
                <div class="report-section">
                    <div class="report-title">
                        <span>💔 Relationship Patterns</span>
                    </div>
                    <div class="report-text">${category.report.relationships}</div>
                </div>
                
                <div class="report-section">
                    <div class="report-title">
                        <span>👥 Friend Group Dynamics</span>
                    </div>
                    <div class="report-text">${category.report.friendGroup}</div>
                </div>
                
                <div class="report-section" style="background: rgba(236, 72, 153, 0.1); border-left: 4px solid rgba(236, 72, 153, 0.6);">
                    <div class="report-title" style="color: rgba(236, 72, 153, 1);">
                        <span>🚩 Your Red Flags</span>
                    </div>
                    <div class="report-text">${category.report.redFlags}</div>
                </div>
                
                <div class="report-highlight">
                    <div class="report-title">
                        <span>✨ Why This Category Matches You</span>
                    </div>
                    <div class="report-text">${category.report.whyMatch}</div>
                </div>
                
                <div class="report-section" style="background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(236, 72, 153, 0.15)); border: 2px solid rgba(99, 102, 241, 0.4); border-radius: 16px; padding: 2rem; margin-top: 2rem;">
                    <div class="report-title" style="color: var(--primary-light); font-size: 1.5rem;">
                        <span>🛒 ${category.report.purchasePrompt}</span>
                    </div>
                    <div class="styles-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-top: 1.5rem;">
                        ${category.styles.map(style => `
                            <div class="style-option-card" onclick="selectStyle('${style.name}')" style="background: rgba(255, 255, 255, 0.05); border: 2px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 1.5rem; text-align: center; cursor: pointer; transition: all 0.3s ease;">
                                <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">${style.emoji}</div>
                                <img src="${style.image}" alt="${style.name}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px; margin-bottom: 0.75rem;">
                                <h4 style="color: white; font-size: 1.1rem; font-weight: 600; margin-bottom: 0.25rem;">${style.name}</h4>
                                <p style="color: rgba(255, 255, 255, 0.6); font-size: 0.875rem;">${style.description}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <div class="share-section">
                <div class="share-title">Share Your Results!</div>
                <p style="color: rgba(255, 255, 255, 0.7); margin-bottom: 1rem;">Let your friends know which Security Kitty category matches their questionable life choices too. The craic is mighty!</p>
                <div class="share-buttons">
                    <a href="https://twitter.com/intent/tweet?text=I'm%20a%20${encodeURIComponent(category.name)}%20Security%20Kitty!%20Find%20your%20match%20at%20Security%20Kitty&url=${encodeURIComponent(window.location.href)}" target="_blank" class="share-btn share-btn-twitter">
                        <span>🐦</span> Twitter
                    </a>
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=I'm%20a%20${encodeURIComponent(category.name)}%20Security%20Kitty!" target="_blank" class="share-btn share-btn-facebook">
                        <span>📘</span> Facebook
                    </a>
                    <button class="share-btn share-btn-copy" onclick="copyResult('${matchedCategory}')">
                        <span>📋</span> Copy Link
                    </button>
                </div>
            </div>
            
            <div class="retake-btn">
                <div style="text-align: center; margin-bottom: 1.5rem;">
                    <button class="btn-secondary btn-large" onclick="retakeQuiz()">
                        <span>Retake Quiz</span>
                    </button>
                    <a href="index.html" class="btn-secondary btn-large" style="text-decoration: none; display: inline-flex; align-items: center; margin-left: 1rem;">
                        <span>Browse All Styles</span>
                    </a>
                </div>
            </div>
        </div>
    `;
    
    // Scroll to results
    setTimeout(() => {
        resultContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

function showQuestion(index) {
    if (index >= questions.length) {
        showResults();
        return;
    }

    currentQuestion = index;
    const question = questions[index];
    const container = document.getElementById('questionContainer');
    
    const progress = ((index + 1) / questions.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';

    container.innerHTML = `
        <div class="question-card">
            <div class="question-number">Question ${index + 1} of ${questions.length}</div>
            <div class="question-text">${question.text}</div>
            <div class="options-grid">
                ${question.options.map((option, optIndex) => `
                    <button class="option-btn" onclick="selectAnswer(${index}, ${optIndex})">
                        <span>${option.text}</span>
                    </button>
                `).join('')}
            </div>
        </div>
    `;

    // Only scroll to question card if it's not the first question (question 2 onwards)
    // First question should show the hero section at the top
    if (index > 0) {
        setTimeout(() => {
            const questionCard = container.querySelector('.question-card');
            if (questionCard) {
                questionCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100);
    }
}

function selectAnswer(questionIndex, optionIndex) {
    const question = questions[questionIndex];
    const selectedOption = question.options[optionIndex];
    
    // Visual feedback
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach((btn, idx) => {
        if (idx === optionIndex) {
            btn.classList.add('selected');
        } else {
            btn.style.opacity = '0.5';
        }
    });
    
    answers[questionIndex] = optionIndex;
    
    // Update category scores
    if (selectedOption.points) {
        Object.keys(selectedOption.points).forEach(category => {
            if (!categoryScores[category]) categoryScores[category] = 0;
            categoryScores[category] += selectedOption.points[category];
        });
    }
    
    // Move to next question after a brief delay
    setTimeout(() => {
        showQuestion(questionIndex + 1);
    }, 600);
}

function showResults() {
    // Find the category with the highest score
    let maxScore = 0;
    let matchedCategory = null;
    let tiedCategories = [];
    
    // Calculate all scores
    Object.keys(categoryScores).forEach(category => {
        if (categoryScores[category] > maxScore) {
            maxScore = categoryScores[category];
            matchedCategory = category;
            tiedCategories = [category];
        } else if (categoryScores[category] === maxScore && maxScore > 0) {
            tiedCategories.push(category);
        }
    });

    // If there's a tie, pick randomly from tied categories
    if (tiedCategories.length > 1) {
        matchedCategory = tiedCategories[Math.floor(Math.random() * tiedCategories.length)];
    }

    // If no clear winner, use a fallback
    if (maxScore === 0 || !matchedCategory) {
        const firstAnswer = answers[0];
        if (firstAnswer !== undefined && questions[0].options[firstAnswer]) {
            matchedCategory = questions[0].options[firstAnswer].category || "Sound";
        } else {
            matchedCategory = "Sound";
        }
    }

    // Update URL with result
    const resultUrl = new URL(window.location.href);
    resultUrl.searchParams.set('result', matchedCategory);
    window.history.pushState({}, '', resultUrl);

    displayResult(matchedCategory);
}

function displayResult(matchedCategory) {
    const category = categoryGroups[matchedCategory];
    const container = document.getElementById('questionContainer');
    const resultContainer = document.getElementById('resultContainer');
    
    container.style.display = 'none';
    resultContainer.classList.add('show');
    
    resultContainer.innerHTML = `
        <div class="result-header">
            <h2 class="result-title">Your Security Kitty Category</h2>
            <p class="result-subtitle">Based on your questionable life choices and personality traits</p>
        </div>
        
        <div class="result-card">
            <div class="matched-style">
                <div class="style-emoji" style="font-size: 4rem;">${category.emoji}</div>
                <div class="style-name" style="font-size: 2.5rem;">${category.name}</div>
                <p style="color: rgba(255, 255, 255, 0.7); font-size: 1.25rem; font-weight: 600;">${category.description}</p>
            </div>
            
            <div class="psych-report">
                <div class="report-section">
                    <div class="report-title">
                        <span>🧠 Personality Analysis</span>
                    </div>
                    <div class="report-text">${category.report.personality}</div>
                </div>
                
                <div class="report-section">
                    <div class="report-title">
                        <span>💔 Relationship Patterns</span>
                    </div>
                    <div class="report-text">${category.report.relationships}</div>
                </div>
                
                <div class="report-section">
                    <div class="report-title">
                        <span>👥 Friend Group Dynamics</span>
                    </div>
                    <div class="report-text">${category.report.friendGroup}</div>
                </div>
                
                <div class="report-section" style="background: rgba(236, 72, 153, 0.1); border-left: 4px solid rgba(236, 72, 153, 0.6);">
                    <div class="report-title" style="color: rgba(236, 72, 153, 1);">
                        <span>🚩 Your Red Flags</span>
                    </div>
                    <div class="report-text">${category.report.redFlags}</div>
                </div>
                
                <div class="report-highlight">
                    <div class="report-title">
                        <span>✨ Why This Category Matches You</span>
                    </div>
                    <div class="report-text">${category.report.whyMatch}</div>
                </div>
                
                <div class="report-section" style="background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(236, 72, 153, 0.15)); border: 2px solid rgba(99, 102, 241, 0.4); border-radius: 16px; padding: 2rem; margin-top: 2rem;">
                    <div class="report-title" style="color: var(--primary-light); font-size: 1.5rem;">
                        <span>🛒 ${category.report.purchasePrompt}</span>
                    </div>
                    <div class="styles-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-top: 1.5rem;">
                        ${category.styles.map(style => `
                            <div class="style-option-card" onclick="selectStyle('${style.name}')" style="background: rgba(255, 255, 255, 0.05); border: 2px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 1.5rem; text-align: center; cursor: pointer; transition: all 0.3s ease;">
                                <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">${style.emoji}</div>
                                <img src="${style.image}" alt="${style.name}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px; margin-bottom: 0.75rem;">
                                <h4 style="color: white; font-size: 1.1rem; font-weight: 600; margin-bottom: 0.25rem;">${style.name}</h4>
                                <p style="color: rgba(255, 255, 255, 0.6); font-size: 0.875rem;">${style.description}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <div class="share-section">
                <div class="share-title">Share Your Results!</div>
                <p style="color: rgba(255, 255, 255, 0.7); margin-bottom: 1rem;">Let your friends know which Security Kitty category matches their questionable life choices too. The craic is mighty!</p>
                <div class="share-buttons">
                    <a href="https://twitter.com/intent/tweet?text=I'm%20a%20${encodeURIComponent(category.name)}%20Security%20Kitty!%20Find%20your%20match%20at%20Security%20Kitty&url=${encodeURIComponent(window.location.href)}" target="_blank" class="share-btn share-btn-twitter">
                        <span>🐦</span> Twitter
                    </a>
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=I'm%20a%20${encodeURIComponent(category.name)}%20Security%20Kitty!" target="_blank" class="share-btn share-btn-facebook">
                        <span>📘</span> Facebook
                    </a>
                    <button class="share-btn share-btn-copy" onclick="copyResult('${matchedCategory}')">
                        <span>📋</span> Copy Link
                    </button>
                </div>
            </div>
            
            <div class="retake-btn">
                <div style="text-align: center; margin-bottom: 1.5rem;">
                    <button class="btn-secondary btn-large" onclick="retakeQuiz()">
                        <span>Retake Quiz</span>
                    </button>
                    <a href="index.html" class="btn-secondary btn-large" style="text-decoration: none; display: inline-flex; align-items: center; margin-left: 1rem;">
                        <span>Browse All Styles</span>
                    </a>
                </div>
            </div>
        </div>
    `;
    
    // Scroll to results
    setTimeout(() => {
        resultContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

function selectStyle(styleName) {
    // Add the style to the cart using localStorage
    // Get existing cart from localStorage or initialize empty cart
    let cart = {};
    try {
        const cartData = localStorage.getItem('securityKittyCart');
        if (cartData) {
            cart = JSON.parse(cartData);
            console.log('Loaded existing cart:', cart);
        }
    } catch (e) {
        console.error('Error loading cart:', e);
    }
    
    // Add the selected style to cart (quantity 1)
    const previousQty = cart[styleName] || 0;
    cart[styleName] = previousQty + 1;
    
    console.log(`Adding ${styleName} to cart. Previous: ${previousQty}, New: ${cart[styleName]}`);
    
    // Save cart back to localStorage
    try {
        localStorage.setItem('securityKittyCart', JSON.stringify(cart));
        console.log('Cart saved to localStorage:', cart);
        
        // Verify it was saved
        const verifyCart = localStorage.getItem('securityKittyCart');
        console.log('Verification - Cart in localStorage:', verifyCart);
    } catch (e) {
        console.error('Error saving cart:', e);
        alert('Error saving to cart. Please try again.');
        return;
    }
    
    // Show confirmation popup
    showCartConfirmationPopup(styleName);
}

function showCartConfirmationPopup(styleName) {
    // Get the style image
    const styleImage = getStyleImage(styleName);
    const styleEmoji = getStyleEmoji(styleName);
    
    // Create popup overlay
    const popup = document.createElement('div');
    popup.className = 'cart-confirmation-popup';
    popup.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        animation: fadeIn 0.3s ease-out;
    `;
    
    popup.innerHTML = `
        <div class="cart-confirmation-content" style="
            background: linear-gradient(135deg, rgba(10, 14, 39, 0.98), rgba(15, 23, 42, 0.98));
            backdrop-filter: blur(20px);
            border: 1px solid rgba(99, 102, 241, 0.3);
            border-radius: 16px;
            padding: 2rem;
            max-width: 420px;
            width: 90%;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
            animation: slideUp 0.3s ease-out;
            position: relative;
        ">
            <button class="popup-close" onclick="closeCartConfirmation()" style="
                position: absolute;
                top: 0.75rem;
                right: 0.75rem;
                background: rgba(255, 255, 255, 0.1);
                border: none;
                color: white;
                width: 28px;
                height: 28px;
                border-radius: 50%;
                cursor: pointer;
                font-size: 1.125rem;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
                line-height: 1;
            ">×</button>
            
            <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">✅</div>
            <h2 style="color: white; font-size: 1.5rem; font-weight: 700; margin-bottom: 0.5rem;">Added to Cart!</h2>
            <p style="color: rgba(255, 255, 255, 0.7); font-size: 0.9375rem; margin-bottom: 1.25rem; line-height: 1.5;">Your ${styleName} Security Kitty has been added</p>
            
            <div style="margin-bottom: 1.5rem;">
                ${styleImage ? `<img src="${styleImage}" alt="${styleName}" style="width: 100px; height: 100px; object-fit: cover; border-radius: 10px; margin: 0 auto 0.5rem; display: block; border: 2px solid rgba(99, 102, 241, 0.4);">` : `<div style="font-size: 2rem; margin-bottom: 0.5rem;">${styleEmoji}</div>`}
                <h3 style="color: white; font-size: 1.125rem; font-weight: 600; margin-top: 0.5rem;">${styleName}</h3>
            </div>
            
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                <a href="index.html#order" onclick="closeCartConfirmation(); verifyCartBeforeNavigate('${styleName}');" class="btn-primary" style="
                    width: 100%;
                    text-align: center;
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0.875rem 1.5rem;
                    font-size: 1rem;
                ">
                    <span>Proceed to Checkout</span>
                    <svg class="btn-arrow" width="18" height="18" viewBox="0 0 20 20" fill="none" style="margin-left: 0.5rem;">
                        <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </a>
                <a href="index.html#products" onclick="closeCartConfirmation(); verifyCartBeforeNavigate('${styleName}');" class="btn-secondary" style="
                    width: 100%;
                    text-align: center;
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0.875rem 1.5rem;
                    font-size: 1rem;
                ">
                    <span>Browse Other Styles</span>
                </a>
            </div>
        </div>
    `;
    
    // Add close on overlay click
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            closeCartConfirmation();
        }
    });
    
    document.body.appendChild(popup);
    
    // Add animations if not already added
    if (!document.getElementById('cartPopupStyles')) {
        const style = document.createElement('style');
        style.id = 'cartPopupStyles';
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            @keyframes slideUp {
                from {
                    transform: translateY(30px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            .popup-close:hover {
                background: rgba(255, 255, 255, 0.2) !important;
                transform: rotate(90deg);
            }
        `;
        document.head.appendChild(style);
    }
}

function closeCartConfirmation() {
    const popup = document.querySelector('.cart-confirmation-popup');
    if (popup) {
        popup.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            popup.remove();
        }, 300);
    }
}

function getStyleImage(styleName) {
    const imageMap = {
        'The BlackEye': 'STYLES/The BlackEye.png',
        'Drama Queen': 'STYLES/Drama Queen.png',
        'Hello Kitty': 'STYLES/Hello Kitty.png',
        'Violet Voltage': 'STYLES/Violet Voltage.png',
        'Sugar Punch': 'STYLES/Sugar Punch.png',
        'Purple Reign': 'STYLES/Purple Reign.png',
        'Midnight Mischief': 'STYLES/Midnight Mischief.png',
        'Cold Snap': 'STYLES/Cold Snap.png',
        'Garden Party': 'STYLES/Garden Party.png',
        'Mint Condition': 'STYLES/Mint Condition.png',
        'Welcome to the Jungle': 'STYLES/Welcome to the Jungle.png',
        'Witchy Woman': 'STYLES/Witchy Woman.png',
        'Blue Steel': 'STYLES/Blue Steel.png',
        'Total Whiteout': 'STYLES/Total Whiteout.png',
        'Silent Alarm': 'STYLES/Silent Alarm.png',
        'BlackCat': 'STYLES/BlackCat.png'
    };
    return imageMap[styleName] || '';
}

function verifyCartBeforeNavigate(styleName) {
    // Verify cart was saved before navigating
    const cartData = localStorage.getItem('securityKittyCart');
    if (cartData) {
        const cart = JSON.parse(cartData);
        console.log('Verifying cart before navigate:', cart);
        console.log(`${styleName} in cart:`, cart[styleName]);
        if (!cart[styleName] || cart[styleName] === 0) {
            console.error('ERROR: Style not found in cart! Re-adding...');
            cart[styleName] = (cart[styleName] || 0) + 1;
            localStorage.setItem('securityKittyCart', JSON.stringify(cart));
            console.log('Re-added to cart:', cart);
        }
    } else {
        console.error('ERROR: No cart found in localStorage! Creating new cart...');
        const newCart = {};
        newCart[styleName] = 1;
        localStorage.setItem('securityKittyCart', JSON.stringify(newCart));
        console.log('Created new cart:', newCart);
    }
}

// Make functions globally accessible
window.selectStyle = selectStyle;
window.closeCartConfirmation = closeCartConfirmation;
window.verifyCartBeforeNavigate = verifyCartBeforeNavigate;

function getStyleEmoji(styleName) {
    const emojiMap = {
        'The BlackEye': '🖤',
        'Drama Queen': '💅',
        'Hello Kitty': '😸',
        'Violet Voltage': '⚡',
        'Sugar Punch': '🐱',
        'Purple Reign': '👑',
        'Midnight Mischief': '🌙',
        'Cold Snap': '❄️',
        'Garden Party': '🌺',
        'Mint Condition': '🌿',
        'Welcome to the Jungle': '🌴',
        'Witchy Woman': '🔮',
        'Blue Steel': '💎',
        'Total Whiteout': '⚪',
        'Silent Alarm': '🔇',
        'BlackCat': '🐈‍⬛'
    };
    return emojiMap[styleName] || '🐾';
}

function copyResult(categoryName = null) {
    const matchedCategory = categoryName || Object.keys(categoryScores).reduce((a, b) => categoryScores[a] > categoryScores[b] ? a : b, "Sound");
    const category = categoryGroups[matchedCategory];
    const shareUrl = window.location.href;
    const text = `I'm a ${category.name} Security Kitty! Find your match: ${shareUrl}`;
    
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Result copied to clipboard!', 'success');
    }).catch(() => {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showNotification('Result copied to clipboard!', 'success');
    });
}

function retakeQuiz() {
    currentQuestion = 0;
    answers = {};
    categoryScores = {};
    document.getElementById('resultContainer').classList.remove('show');
    document.getElementById('resultContainer').innerHTML = '';
    document.getElementById('questionContainer').style.display = 'block';
    showQuestion(0);
}

function showNotification(message, type = 'info') {
    const existing = document.querySelector('.quiz-notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = `quiz-notification quiz-notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? 'rgba(16, 185, 129, 0.9)' : 'rgba(99, 102, 241, 0.9)'};
        color: white;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        backdrop-filter: blur(10px);
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    .style-option-card:hover {
        transform: translateY(-5px);
        border-color: var(--primary-light) !important;
        box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
    }
`;
document.head.appendChild(style);

// Initialize quiz when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initQuiz);
} else {
    initQuiz();
}
