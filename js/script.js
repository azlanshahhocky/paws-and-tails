document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.getElementById('theme-switch');
    let currentTheme = localStorage.getItem('theme') || 'light'; // Default to light theme

    // Apply the saved theme
    document.documentElement.setAttribute('data-theme', currentTheme);

    // Update the button content based on the current theme
    updateButtonContent(themeSwitch, currentTheme);

    themeSwitch.addEventListener('click', () => {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light'; // Toggle theme
        document.documentElement.setAttribute('data-theme', currentTheme);
        localStorage.setItem('theme', currentTheme);

        // Update the button content
        updateButtonContent(themeSwitch, currentTheme);
    });

    function updateButtonContent(button, theme) {
        const icon = document.createElement('div');
        icon.className = `icon ${theme === 'light' ? 'sun' : 'moon'}`; // Add icon class
        button.innerHTML = ''; // Clear existing content
        button.appendChild(icon);
        button.appendChild(document.createTextNode(theme === 'light' ? 'Light Mode' : 'Dark Mode')); // Add text
    }
});
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("back-to-top").style.display = "block";
    } else {
        document.getElementById("back-to-top").style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
}

const articles = [
    // Add 63 article titles and content here
	{
        title: "Golden Retriever Puppies: Care and Health Tips",
        content: `
            <div class="article">
                <h3>Golden Retriever Puppies: Care and Health Tips</h3>
                <p>Golden Retrievers are one of the most popular dog breeds due to their friendly and tolerant attitudes. They are great family pets and are also used as service dogs. Here are some tips for caring for your Golden Retriever puppy:</p>
                <ul>
                    <li><strong>Diet:</strong> Feed your Golden Retriever puppy high-quality puppy food that is rich in protein and fat to support their growth and development.</li>
                    <li><strong>Exercise:</strong> Golden Retrievers are active dogs that require regular exercise. Daily walks and playtime are essential.</li>
                    <li><strong>Health Check-ups:</strong> Regular veterinary check-ups are crucial to ensure your puppy is healthy and up-to-date on vaccinations.</li>
                    <li><strong>Grooming:</strong> Golden Retrievers have a thick double coat that requires regular brushing to prevent matting and reduce shedding.</li>
                </ul>
                <p>By following these tips, you can ensure your Golden Retriever puppy grows up to be a healthy and happy dog.</p>
            </div>
        `
    },
    {
        title: "Labrador Retriever Puppies: A Complete Guide",
        content: `
            <div class="article">
                <h3>Labrador Retriever Puppies: A Complete Guide</h3>
                <p>Labrador Retrievers are known for their friendly nature and high energy levels. Here's what you need to know about raising a Labrador Retriever puppy:</p>
                <ul>
                    <li><strong>Diet:</strong> Labradors love to eat, so it's important to monitor their food intake to prevent obesity.</li>
                    <li><strong>Exercise:</strong> These dogs need plenty of exercise to burn off their energy. Regular walks and playtime are a must.</li>
                    <li><strong>Training:</strong> Labradors are intelligent and eager to please, making them relatively easy to train.</li>
                    <li><strong>Health:</strong> Common health issues in Labradors include hip dysplasia and obesity, so regular vet visits are essential.</li>
                </ul>
            </div>
        `
    },
    // Add 61 more articles here...
	{
		title: "German Shepherd Puppies: Training and Care",
		content: `
        <div class="article">
            <h3>German Shepherd Puppies: Training and Care</h3>
            <p>German Shepherds are intelligent, loyal, and versatile dogs. Here's how to care for your German Shepherd puppy:</p>
            <ul>
                <li><strong>Training:</strong> Start training early to establish good behavior and socialization.</li>
                <li><strong>Exercise:</strong> German Shepherds are high-energy dogs that need plenty of exercise and mental stimulation.</li>
                <li><strong>Diet:</strong> Feed them a balanced diet to support their growth and energy needs.</li>
                <li><strong>Health:</strong> Watch for common health issues like hip dysplasia and digestive problems.</li>
            </ul>
        </div>
		 `
	},
	
	{
    title: "French Bulldog Puppies: What You Need to Know",
    content: `
        <div class="article">
            <h3>French Bulldog Puppies: What You Need to Know</h3>
            <p>French Bulldogs are adorable, compact, and full of personality. Here's how to care for your Frenchie puppy:</p>
            <ul>
                <li><strong>Diet:</strong> Feed them high-quality food to avoid weight gain, as Frenchies are prone to obesity.</li>
                <li><strong>Exercise:</strong> Moderate exercise is key, as they can overheat due to their short snouts.</li>
                <li><strong>Health:</strong> Be aware of breathing issues and joint problems common in the breed.</li>
                <li><strong>Grooming:</strong> Regular cleaning of their facial wrinkles is essential to prevent infections.</li>
            </ul>
        </div>
    `
	},
	{
    title: "Poodle Puppies: Grooming and Care Tips",
    content: `
        <div class="article">
            <h3>Poodle Puppies: Grooming and Care Tips</h3>
            <p>Poodles are highly intelligent and elegant dogs. Here's how to care for your Poodle puppy:</p>
            <ul>
                <li><strong>Grooming:</strong> Regular brushing and professional grooming are necessary to maintain their curly coat.</li>
                <li><strong>Training:</strong> Poodles are quick learners and excel in obedience training.</li>
                <li><strong>Exercise:</strong> They need daily exercise to stay healthy and happy.</li>
                <li><strong>Health:</strong> Watch for issues like hip dysplasia and eye problems.</li>
            </ul>
        </div>
    `
	},
	{
    title: "Bulldog Puppies: Health and Care Guide",
    content: `
        <div class="article">
            <h3>Bulldog Puppies: Health and Care Guide</h3>
            <p>Bulldogs are known for their wrinkled faces and gentle nature. Here's how to care for your Bulldog puppy:</p>
            <ul>
                <li><strong>Diet:</strong> Feed them a balanced diet to maintain a healthy weight.</li>
                <li><strong>Exercise:</strong> Moderate exercise is important, as Bulldogs can overheat easily.</li>
                <li><strong>Health:</strong> Be aware of breathing issues and skin infections common in the breed.</li>
                <li><strong>Grooming:</strong> Regular cleaning of their wrinkles is essential.</li>
            </ul>
        </div>
    `
	},
	{
    title: "Beagle Puppies: Training and Care Tips",
    content: `
        <div class="article">
            <h3>Beagle Puppies: Training and Care Tips</h3>
            <p>Beagles are friendly, curious, and great with families. Here's how to care for your Beagle puppy:</p>
            <ul>
                <li><strong>Training:</strong> Start training early to manage their strong hunting instincts.</li>
                <li><strong>Exercise:</strong> Beagles need plenty of exercise to stay happy and healthy.</li>
                <li><strong>Diet:</strong> Monitor their food intake to prevent obesity.</li>
                <li><strong>Health:</strong> Watch for ear infections and hip dysplasia.</li>
            </ul>
        </div>
    `
	},
	{
    title: "Rottweiler Puppies: A Complete Guide",
    content: `
        <div class="article">
            <h3>Rottweiler Puppies: A Complete Guide</h3>
            <p>Rottweilers are strong, loyal, and protective dogs. Here's how to care for your Rottweiler puppy:</p>
            <ul>
                <li><strong>Training:</strong> Early socialization and obedience training are crucial.</li>
                <li><strong>Exercise:</strong> They need plenty of exercise to stay healthy and calm.</li>
                <li><strong>Diet:</strong> Feed them high-quality food to support their growth.</li>
                <li><strong>Health:</strong> Watch for hip dysplasia and heart issues.</li>
            </ul>
        </div>
    `
	},
	{
    title: "Dachshund Puppies: Care and Health Tips",
    content: `
        <div class="article">
            <h3>Dachshund Puppies: Care and Health Tips</h3>
            <p>Dachshunds, also known as "wiener dogs," are playful and loyal. Here's how to care for your Dachshund puppy:</p>
            <ul>
                <li><strong>Exercise:</strong> Regular walks and playtime are important, but avoid activities that strain their backs.</li>
                <li><strong>Diet:</strong> Feed them a balanced diet to maintain a healthy weight.</li>
                <li><strong>Health:</strong> Be aware of back problems common in the breed.</li>
                <li><strong>Grooming:</strong> Regular brushing is necessary for long-haired Dachshunds.</li>
            </ul>
        </div>
    `
	},
	{
    title: "Boxer Puppies: Training and Care",
    content: `
        <div class="article">
            <h3>Boxer Puppies: Training and Care</h3>
            <p>Boxers are energetic, playful, and great with families. Here's how to care for your Boxer puppy:</p>
            <ul>
                <li><strong>Training:</strong> Start training early to manage their high energy levels.</li>
                <li><strong>Exercise:</strong> They need plenty of exercise to stay happy and healthy.</li>
                <li><strong>Diet:</strong> Feed them high-quality food to support their growth.</li>
                <li><strong>Health:</strong> Watch for heart issues and hip dysplasia.</li>
            </ul>
        </div>
    `
	},
	{
    title: "Shih Tzu Puppies: Grooming and Care Tips",
    content: `
        <div class="article">
            <h3>Shih Tzu Puppies: Grooming and Care Tips</h3>
            <p>Shih Tzus are small, affectionate, and great companions. Here's how to care for your Shih Tzu puppy:</p>
            <ul>
                <li><strong>Grooming:</strong> Regular brushing and professional grooming are essential to maintain their long coat.</li>
                <li><strong>Diet:</strong> Feed them high-quality food to keep their coat shiny and healthy.</li>
                <li><strong>Exercise:</strong> Moderate exercise is sufficient for this breed.</li>
                <li><strong>Health:</strong> Watch for eye problems and dental issues.</li>
            </ul>
        </div>
    `
	},
	{
    title: "Siberian Husky Puppies: Care and Training",
    content: `
        <div class="article">
            <h3>Siberian Husky Puppies: Care and Training</h3>
            <p>Siberian Huskies are energetic, intelligent, and love the outdoors. Here's how to care for your Husky puppy:</p>
            <ul>
                <li><strong>Exercise:</strong> They need plenty of exercise and mental stimulation to stay happy.</li>
                <li><strong>Training:</strong> Start training early to manage their independent nature.</li>
                <li><strong>Diet:</strong> Feed them high-quality food to support their energy needs.</li>
                <li><strong>Health:</strong> Watch for hip dysplasia and eye issues.</li>
            </ul>
        </div>
    `
	},
	{
    title: "Chihuahua Puppies: A Complete Guide",
    content: `
        <div class="article">
            <h3>Chihuahua Puppies: A Complete Guide</h3>
            <p>Chihuahuas are small, lively, and full of personality. Here's how to care for your Chihuahua puppy:</p>
            <ul>
                <li><strong>Diet:</strong> Feed them small, high-quality meals to maintain their energy levels.</li>
                <li><strong>Exercise:</strong> Short walks and indoor playtime are sufficient.</li>
                <li><strong>Health:</strong> Watch for dental issues and hypoglycemia.</li>
                <li><strong>Training:</strong> Socialize them early to prevent behavioral issues.</li>
            </ul>
        </div>
    `
	},
	{
    title: "Pomeranian Puppies: Grooming and Care",
    content: `
        <div class="article">
            <h3>Pomeranian Puppies: Grooming and Care</h3>
            <p>Pomeranians are small, fluffy, and full of energy. Here's how to care for your Pomeranian puppy:</p>
            <ul>
                <li><strong>Grooming:</strong> Regular brushing is essential to prevent matting and tangles.</li>
                <li><strong>Diet:</strong> Feed them high-quality food to maintain their coat and energy levels.</li>
                <li><strong>Exercise:</strong> Short walks and indoor playtime are sufficient.</li>
                <li><strong>Health:</strong> Watch for dental issues and luxating patella.</li>
            </ul>
        </div>
    `
	},
	{
    title: "Great Dane Puppies: Health and Care Tips",
    content: `
        <div class="article">
            <h3>Great Dane Puppies: Health and Care Tips</h3>
            <p>Great Danes are gentle giants with a calm demeanor. Here's how to care for your Great Dane puppy:</p>
            <ul>
                <li><strong>Diet:</strong> Feed them high-quality food to support their rapid growth.</li>
                <li><strong>Exercise:</strong> Moderate exercise is important to avoid joint stress.</li>
                <li><strong>Health:</strong> Watch for bloat, hip dysplasia, and heart issues.</li>
                <li><strong>Training:</strong> Start training early to manage their size and strength.</li>
            </ul>
        </div>
    `
	},
	{
    title: "Cocker Spaniel Puppies: Care and Grooming",
    content: `
        <div class="article">
            <h3>Cocker Spaniel Puppies: Care and Grooming</h3>
            <p>Cocker Spaniels are affectionate, intelligent, and great family pets. Here's how to care for your Cocker Spaniel puppy:</p>
            <ul>
                <li><strong>Grooming:</strong> Regular brushing and professional grooming are essential to maintain their coat.</li>
                <li><strong>Diet:</strong> Feed them high-quality food to keep their coat shiny and healthy.</li>
                <li><strong>Exercise:</strong> Moderate exercise is sufficient for this breed.</li>
                <li><strong>Health:</strong> Watch for ear infections and eye issues.</li>
            </ul>
        </div>
    `
	},
	{
    title: "Dalmatian Puppies: Training and Care",
    content: `
        <div class="article">
            <h3>Dalmatian Puppies: Training and Care</h3>
            <p>Dalmatians are energetic, intelligent, and known for their unique spots. Here's how to care for your Dalmatian puppy:</p>
            <ul>
                <li><strong>Exercise:</strong> They need plenty of exercise to burn off their energy.</li>
                <li><strong>Training:</strong> Start training early to manage their strong-willed nature.</li>
                <li><strong>Diet:</strong> Feed them high-quality food to support their energy needs.</li>
                <li><strong>Health:</strong> Watch for deafness and urinary stones.</li>
            </ul>
        </div>
    `
	},
	{
    title: "Yorkshire Terrier Puppies: Care and Grooming",
    content: `
        <div class="article">
            <h3>Yorkshire Terrier Puppies: Care and Grooming</h3>
            <p>Yorkshire Terriers, or Yorkies, are small, energetic, and full of personality. Here's how to care for your Yorkie puppy:</p>
            <ul>
                <li><strong>Grooming:</strong> Regular brushing and professional grooming are essential to maintain their coat.</li>
                <li><strong>Diet:</strong> Feed them high-quality food to keep their coat shiny and healthy.</li>
                <li><strong>Exercise:</strong> Short walks and indoor playtime are sufficient.</li>
                <li><strong>Health:</strong> Watch for dental issues and hypoglycemia.</li>
            </ul>
        </div>
    `
	},
	{
    title: "Bulldog Puppies: Health and Care Guide",
    content: `
        <div class="article">
            <h3>Bulldog Puppies: Health and Care Guide</h3>
            <p>Bulldogs are known for their wrinkled faces and gentle nature. Here's how to care for your Bulldog puppy:</p>
            <ul>
                <li><strong>Diet:</strong> Feed them a balanced diet to maintain a healthy weight.</li>
                <li><strong>Exercise:</strong> Moderate exercise is important, as Bulldogs can overheat easily.</li>
                <li><strong>Health:</strong> Be aware of breathing issues and skin infections common in the breed.</li>
                <li><strong>Grooming:</strong> Regular cleaning of their wrinkles is essential.</li>
            </ul>
        </div>
    `
	},
	{
    title: "Pug Puppies: Care and Health Tips",
    content: `
        <div class="article">
            <h3>Pug Puppies: Care and Health Tips</h3>
            <p>Pugs are charming, playful, and great companions. Here's how to care for your Pug puppy:</p>
            <ul>
                <li><strong>Diet:</strong> Feed them high-quality food to avoid weight gain.</li>
                <li><strong>Exercise:</strong> Moderate exercise is key, as Pugs can overheat easily.</li>
                <li><strong>Health:</strong> Be aware of breathing issues and eye problems common in the breed.</li>
                <li><strong>Grooming:</strong> Regular cleaning of their facial wrinkles is essential.</li>
            </ul>
        </div>
    `
	},
	{
    title: "Australian Shepherd Puppies: Care and Training",
    content: `
        <div class="article">
            <h3>Australian Shepherd Puppies: Care and Training</h3>
            <p>Australian Shepherds are intelligent, energetic, and great working dogs. Here's how to care for your Aussie puppy:</p>
            <ul>
                <li><strong>Exercise:</strong> They need plenty of exercise and mental stimulation to stay happy.</li>
                <li><strong>Training:</strong> Start training early to manage their high energy levels and intelligence.</li>
                <li><strong>Diet:</strong> Feed them high-quality food to support their active lifestyle.</li>
                <li><strong>Health:</strong> Watch for hip dysplasia and eye issues.</li>
            </ul>
        </div>
    `
	},
	{
    title: "Border Collie Puppies: Training and Care",
    content: `
        <div class="article">
            <h3>Border Collie Puppies: Training and Care</h3>
            <p>Border Collies are highly intelligent and excel in agility and obedience. Here's how to care for your Border Collie puppy:</p>
            <ul>
                <li><strong>Training:</strong> Start training early to channel their intelligence and energy.</li>
                <li><strong>Exercise:</strong> They need plenty of physical and mental exercise to stay happy.</li>
                <li><strong>Diet:</strong> Feed them high-quality food to support their energy needs.</li>
                <li><strong>Health:</strong> Watch for hip dysplasia and eye issues.</li>
            </ul>
        </div>
    `
	},
	{
    title: "Bichon Frise Puppies: Grooming and Care",
    content: `
        <div class="article">
            <h3>Bichon Frise Puppies: Grooming and Care</h3>
            <p>Bichon Frises are small, cheerful, and great companions. Here's how to care for your Bichon Frise puppy:</p>
            <ul>
                <li><strong>Grooming:</strong> Regular brushing and professional grooming are essential to maintain their fluffy coat.</li>
                <li><strong>Diet:</strong> Feed them high-quality food to keep their coat healthy.</li>
                <li><strong>Exercise:</strong> Moderate exercise is sufficient for this breed.</li>
                <li><strong>Health:</strong> Watch for allergies and dental issues.</li>
            </ul>
        </div>
    `
	},
	{
    title: "Maltese Puppies: Care and Grooming Tips",
    content: `
        <div class="article">
            <h3>Maltese Puppies: Care and Grooming Tips</h3>
            <p>Maltese dogs are small, affectionate, and known for their long, silky coats. Here's how to care for your Maltese puppy:</p>
            <ul>
                <li><strong>Grooming:</strong> Daily brushing is necessary to prevent tangles and mats.</li>
                <li><strong>Diet:</strong> Feed them high-quality food to maintain their coat and overall health.</li>
                <li><strong>Exercise:</strong> Short walks and indoor playtime are sufficient.</li>
                <li><strong>Health:</strong> Watch for dental issues and hypoglycemia.</li>
            </ul>
        </div>
    `
	},
	{
    title: "Bernese Mountain Dog Puppies: Health and Care",
    content: `
        <div class="article">
            <h3>Bernese Mountain Dog Puppies: Health and Care</h3>
            <p>Bernese Mountain Dogs are large, gentle, and great family pets. Here's how to care for your Bernese Mountain Dog puppy:</p>
            <ul>
                <li><strong>Diet:</strong> Feed them high-quality food to support their growth and energy needs.</li>
                <li><strong>Exercise:</strong> Moderate exercise is important to avoid joint stress.</li>
                <li><strong>Health:</strong> Watch for hip dysplasia and cancer, which are common in the breed.</li>
                <li><strong>Grooming:</strong> Regular brushing is necessary to maintain their thick coat.</li>
            </ul>
        </div>
    `
	},
	{
    title: "Cavalier King Charles Spaniel Puppies: Care Tips",
    content: `
        <div class="article">
            <h3>Cavalier King Charles Spaniel Puppies: Care Tips</h3>
            <p>Cavalier King Charles Spaniels are affectionate, gentle, and great with families. Here's how to care for your Cavalier puppy:</p>
            <ul>
                <li><strong>Diet:</strong> Feed them high-quality food to maintain their health and energy levels.</li>
                <li><strong>Exercise:</strong> Moderate exercise is sufficient for this breed.</li>
                <li><strong>Health:</strong> Watch for heart issues and syringomyelia.</li>
                <li><strong>Grooming:</strong> Regular brushing is necessary to maintain their silky coat.</li>
            </ul>
        </div>
    `
	},
	{
    title: "Shetland Sheepdog Puppies: Training and Care",
    content: `
        <div class="article">
            <h3>Shetland Sheepdog Puppies: Training and Care</h3>
            <p>Shetland Sheepdogs, or Shelties, are intelligent, loyal, and great herding dogs. Here's how to care for your Sheltie puppy:</p>
            <ul>
                <li><strong>Training:</strong> Start training early to manage their intelligence and energy.</li>
                <li><strong>Exercise:</strong> They need plenty of exercise and mental stimulation.</li>
                <li><strong>Diet:</strong> Feed them high-quality food to support their energy needs.</li>
                <li><strong>Health:</strong> Watch for hip dysplasia and eye issues.</li>
            </ul>
        </div>
    `
	},
	{
    title: "Boston Terrier Puppies: Health and Care Guide",
    content: `
        <div class="article">
            <h3>Boston Terrier Puppies: Health and Care Guide</h3>
            <p>Boston Terriers are small, friendly, and full of personality. Here's how to care for your Boston Terrier puppy:</p>
            <ul>
                <li><strong>Diet:</strong> Feed them high-quality food to maintain their health and energy levels.</li>
                <li><strong>Exercise:</strong> Moderate exercise is sufficient for this breed.</li>
                <li><strong>Health:</strong> Watch for breathing issues and eye problems.</li>
                <li><strong>Grooming:</strong> Regular brushing is necessary to maintain their short coat.</li>
            </ul>
        </div>
    `
	},
	{
    title: "Newfoundland Puppies: Care and Training",
    content: `
        <div class="article">
            <h3>Newfoundland Puppies: Care and Training</h3>
            <p>Newfoundlands are large, gentle, and great with families. Here's how to care for your Newfoundland puppy:</p>
            <ul>
                <li><strong>Diet:</strong> Feed them high-quality food to support their rapid growth.</li>
                <li><strong>Exercise:</strong> Moderate exercise is important to avoid joint stress.</li>
                <li><strong>Health:</strong> Watch for hip dysplasia and heart issues.</li>
                <li><strong>Grooming:</strong> Regular brushing is necessary to maintain their thick coat.</li>
            </ul>
        </div>
    `
	},
	{
    title: "Pembroke Welsh Corgi Puppies: Care and Health Tips",
    content: `
        <div class="article">
            <h3>Pembroke Welsh Corgi Puppies: Care and Health Tips</h3>
            <p>Pembroke Welsh Corgis are small, intelligent, and great herding dogs. Here's how to care for your Corgi puppy:</p>
            <ul>
                <li><strong>Diet:</strong> Feed them high-quality food to maintain their health and energy levels.</li>
                <li><strong>Exercise:</strong> They need plenty of exercise to stay happy and healthy.</li>
                <li><strong>Health:</strong> Watch for hip dysplasia and back problems.</li>
                <li><strong>Grooming:</strong> Regular brushing is necessary to maintain their double coat.</li>
            </ul>
        </div>
    `
	},
       
        {
        title: "Puppy Dental Care: Preventing Early Tooth Decay",
        content: `
        <div class="article">
            <h3>Essential Dental Care Routine for Puppies</h3>
            <p>Proper oral hygiene prevents costly vet bills. Implement these practices:</p>
            <h4>Daily Brushing Protocol</h4>
            <ul>
                <li>Use enzymatic toothpaste formulated for dogs</li>
                <li>Start with finger brushes for puppies under 6 months</li>
                <li>Focus on outer surfaces of back molars</li>
            </ul>
            <h4>Warning Signs of Dental Issues</h4>
            <ul>
                <li>Persistent bad breath</li>
                <li>Red or swollen gums</li>
                <li>Difficulty chewing dry food</li>
            </ul>
        </div>`
    },

    // Article 32: Puppy Exercise Guidelines
    {
        title: "Puppy Exercise Requirements by Breed Size",
        content: `
        <div class="article">
            <h3>Safe Exercise Limits for Growing Puppies</h3>
            <h4>Small Breeds (Under 20 lbs)</h4>
            <ul>
                <li>5 minutes exercise per month of age</li>
                <li>Avoid jumping from heights</li>
                <li>Recommended activities: indoor fetch, puzzle toys</li>
            </ul>
            <h4>Large Breeds (Over 50 lbs)</h4>
            <ul>
                <li>3-4 short walks daily</li>
                <li>Swimming for low-impact exercise</li>
                <li>Avoid forced running before 18 months</li>
            </ul>
        </div>`
    },

    // Article 33: Puppy Sleep Training
    {
        title: "Establishing Healthy Sleep Patterns in Puppies",
        content: `
        <div class="article">
            <h3>Crate Training for Better Puppy Sleep</h3>
            <h4>Nighttime Routine</h4>
            <ul>
                <li>Last meal 3 hours before bedtime</li>
                <li>Final potty break right before crate</li>
                <li>White noise machine to mask sounds</li>
            </ul>
            <h4>Common Sleep Challenges</h4>
            <ul>
                <li>Whining: Wait 15 minutes before responding</li>
                <li>Early waking: Use blackout curtains</li>
                <li>Nighttime accidents: Limit water after 8 PM</li>
            </ul>
        </div>`
    },

    // Article 34: Puppy Coat Care
    {
        title: "Puppy Grooming: Maintaining Healthy Skin and Coat",
        content: `
        <div class="article">
            <h3>Breed-Specific Grooming Requirements</h3>
            <h4>Double-Coated Breeds</h4>
            <ul>
                <li>Brush 3x weekly with undercoat rake</li>
                <li>Avoid shaving in summer</li>
                <li>Use de-shedding tools during seasonal changes</li>
            </ul>
            <h4>Wire-Haired Breeds</h4>
            <ul>
                <li>Hand-stripping every 8-10 weeks</li>
                <li>Use bristle brush for daily maintenance</li>
                <li>Specialized shampoos for coarse hair</li>
            </ul>
        </div>`
    },

    // Article 35: Puppy Anxiety Solutions
    {
        title: "Reducing Separation Anxiety in Puppies",
        content: `
        <div class="article">
            <h3>Progressive Desensitization Techniques</h3>
            <h4>Training Protocol</h4>
            <ul>
                <li>Start with 5-minute absences</li>
                <li>Use departure cues without leaving</li>
                <li>Introduce food-stuffed toys for distraction</li>
            </ul>
            <h4>Natural Calming Aids</h4>
            <ul>
                <li>Adaptil pheromone diffusers</li>
                <li>L-theanine supplements</li>
                <li>Weighted anxiety wraps</li>
            </ul>
        </div>`
    },

    // Article 36: Puppy Nutrition
    {
        title: "Balanced Diets for Puppies: Macronutrient Ratios",
        content: `
        <div class="article">
            <h3>AAFCO Nutritional Guidelines for Puppies</h3>
            <h4>Essential Nutrients</h4>
            <ul>
                <li>Protein: 22-32% (depending on breed)</li>
                <li>Fat: 8-20%</li>
                <li>Calcium: 1.0-1.8%</li>
            </ul>
            <h4>Feeding Schedule</h4>
            <ul>
                <li>8-12 weeks: 4 meals daily</li>
                <li>3-6 months: 3 meals daily</li>
                <li>6+ months: 2 meals daily</li>
            </ul>
        </div>`
    },

    // Article 37: Puppy Parasite Prevention
    {
        title: "Comprehensive Parasite Protection for Puppies",
        content: `
        <div class="article">
            <h3>Monthly Preventative Schedule</h3>
            <h4>Essential Protections</h4>
            <ul>
                <li>Flea/tick: Start at 8 weeks</li>
                <li>Heartworm: Begin at 12 weeks</li>
                <li>Intestinal worms: Deworm every 2-3 weeks</li>
            </ul>
            <h4>Natural Prevention Methods</h4>
            <ul>
                <li>Diatomaceous earth in bedding</li>
                <li>Nematode-repelling plants in yard</li>
                <li>Apple cider vinegar in water</li>
            </ul>
        </div>`
    },

    // Article 38: Puppy Training Basics
    {
        title: "Foundational Obedience Training for Puppies",
        content: `
        <div class="article">
            <h3>First Commands to Teach</h3>
            <h4>Priority Skills</h4>
            <ul>
                <li>Name recognition</li>
                <li>Sit/stay</li>
                <li>Leash pressure response</li>
            </ul>
            <h4>Training Session Guidelines</h4>
            <ul>
                <li>2-5 minute sessions</li>
                <li>High-value rewards</li>
                <li>End on positive note</li>
            </ul>
        </div>`
    },

    // Article 39: Puppy First Aid
    {
        title: "Emergency First Aid Kit Essentials for Puppy Owners",
        content: `
        <div class="article">
            <h3>Must-Have Supplies</h3>
            <h4>Basic Kit Components</h4>
            <ul>
                <li>Digital pet thermometer</li>
                <li>Non-stick gauze pads</li>
                <li>3% hydrogen peroxide</li>
            </ul>
            <h4>Emergency Protocols</h4>
            <ul>
                <li>Choking: Canine Heimlich maneuver</li>
                <li>Poisoning: ASPCA poison control number</li>
                <li>Bleeding: Pressure application techniques</li>
            </ul>
        </div>`
    },

    // Article 40: Puppy Socialization
    {
        title: "Safe Socialization Practices for Unvaccinated Puppies",
        content: `
        <div class="article">
            <h3>Low-Risk Exposure Methods</h3>
            <h4>Controlled Environments</h4>
            <ul>
                <li>Puppy socialization classes</li>
                <li>Carry in dog-friendly stores</li>
                <li>Invite vaccinated dogs to home</li>
            </ul>
            <h4>Desensitization Exercises</h4>
            <ul>
                <li>Play urban sound recordings</li>
                <li>Introduce novel objects daily</li>
                <li>Practice handling exercises</li>
            </ul>
        </div>`
    },

    // Article 41: Puppy Growth Monitoring
    {
        title: "Tracking Healthy Puppy Growth: Weight Charts",
        content: `
        <div class="article">
            <h3>Breed-Specific Growth Patterns</h3>
            <h4>Small Breeds</h4>
            <ul>
                <li>Reach adult weight by 9-12 months</li>
                <li>Average gain: 5-10% weekly</li>
            </ul>
            <h4>Giant Breeds</h4>
            <ul>
                <li>Continue growing until 18-24 months</li>
                <li>Controlled weight gain crucial</li>
            </ul>
        </div>`
    },

    // Article 42: Puppy Car Safety
    {
        title: "Safe Car Travel Practices for Puppies",
        content: `
        <div class="article">
            <h3>Secure Restraint Systems</h3>
            <h4>Approved Options</h4>
            <ul>
                <li>Crash-tested carriers</li>
                <li>Backseat harnesses</li>
                <li>Vehicle barriers</li>
            </ul>
            <h4>Motion Sickness Prevention</h4>
            <ul>
                <li>Withhold food 2 hours pre-trip</li>
                <li>Use ginger supplements</li>
                <li>Gradual acclimation to rides</li>
            </ul>
        </div>`
    },

    // Article 43: Puppy Play Behavior
    {
        title: "Understanding Appropriate Puppy Play",
        content: `
        <div class="article">
            <h3>Healthy Play vs Aggression</h3>
            <h4>Positive Indicators</h4>
            <ul>
                <li>Loose, wiggly body language</li>
                <li>Self-handicapping</li>
                <li>Role reversal</li>
            </ul>
            <h4>Warning Signs</h4>
            <ul>
                <li>Stiff posture</li>
                <li>Unbroken staring</li>
                <li>Escalated biting</li>
            </ul>
        </div>`
    },

    // Article 44: Puppy Spaying/Neutering
    {
        title: "Optimal Age for Spay/Neuter by Breed",
        content: `
        <div class="article">
            <h3>Veterinary Recommendations</h3>
            <h4>Small Breeds</h4>
            <ul>
                <li>6-9 months</li>
                <li>Before first heat cycle</li>
            </ul>
            <h4>Large Breeds</h4>
            <ul>
                <li>12-24 months</li>
                <li>After growth plates close</li>
            </ul>
        </div>`
    },

    // Article 45: Puppy Identification
    {
        title: "Puppy Identification Methods: Beyond Microchipping",
        content: `
        <div class="article">
            <h3>Modern Tracking Solutions</h3>
            <h4>Permanent Options</h4>
            <ul>
                <li>Tattoo identification</li>
                <li>DNA profiling</li>
                <li>GPS collar tags</li>
            </ul>
            <h4>Temporary Solutions</h4>
            <ul>
                <li>QR code collar tags</li>
                <li>Smartphone-enabled trackers</li>
                <li>Custom embroidered collars</li>
            </ul>
        </div>`
    },
    // Article 46: Puppy Heat Safety
    {
        title: "Summer Puppy Care: Preventing Heatstroke",
        content: `
        <div class="article">
            <h3>Heat Safety Protocol for Puppies</h3>
            <h4>Risk Factors</h4>
            <ul>
                <li>Brachycephalic breeds (pugs, bulldogs)</li>
                <li>Puppies under 6 months</li>
                <li>Dark-coated breeds</li>
            </ul>
            <h4>Cooling Techniques</h4>
            <ul>
                <li>Paw-sole cooling pads</li>
                <li>Hydration supplements with electrolytes</li>
                <li>Shade rotation in outdoor spaces</li>
            </ul>
        </div>`
    },

    // Article 47: Puppy Allergy Management
    {
        title: "Identifying and Managing Puppy Allergies",
        content: `
        <div class="article">
            <h3>Common Allergy Triggers</h3>
            <h4>Environmental</h4>
            <ul>
                <li>Pollen (atopy)</li>
                <li>Dust mites</li>
                <li>Mold spores</li>
            </ul>
            <h4>Food-Related</h4>
            <ul>
                <li>Beef (34% of cases)</li>
                <li>Dairy (17%)</li>
                <li>Wheat (15%)</li>
            </ul>
        </div>`
    },

    // Article 48: Puppy Fear Periods
    {
        title: "Navigating Puppy Fear Development Stages",
        content: `
        <div class="article">
            <h3>Critical Fear Period Timeline</h3>
            <h4>8-11 Weeks</h4>
            <ul>
                <li>Avoid traumatic experiences</li>
                <li>Gradual exposure to stimuli</li>
            </ul>
            <h4>6-14 Months</h4>
            <ul>
                <li>Adolescent fear phase</li>
                <li>Maintain consistent routines</li>
            </ul>
        </div>`
    },

    // Article 49: Puppy Hydration
    {
        title: "Proper Hydration for Puppies: Daily Requirements",
        content: `
        <div class="article">
            <h3>Water Intake Guidelines</h3>
            <h4>Calculation Formula</h4>
            <ul>
                <li>1/2 cup per pound of body weight</li>
                <li>+50% for active/working breeds</li>
            </ul>
            <h4>Dehydration Signs</h4>
            <ul>
                <li>Tacky gums</li>
                <li>Loss of skin elasticity</li>
                <li>Sunken eyes</li>
            </ul>
        </div>`
    },

    // Article 50: Puppy Collar Selection
    {
        title: "Choosing Safe Collars for Growing Puppies",
        content: `
        <div class="article">
            <h3>Collar Safety Features</h3>
            <h4>Essential Criteria</h4>
            <ul>
                <li>Breakaway buckles</li>
                <li>2-finger tightness rule</li>
                <li>Reflective stitching</li>
            </ul>
            <h4>Material Options</h4>
            <ul>
                <li>Biothane for water resistance</li>
                <li>Neoprene for comfort</li>
                <li>Leather for durability</li>
            </ul>
        </div>`
    },

    // Article 51: Puppy Genetic Testing
    {
        title: "DNA Testing for Puppies: Breed-Specific Risks",
        content: `
        <div class="article">
            <h3>Common Tested Conditions</h3>
            <h4>Large Breeds</h4>
            <ul>
                <li>Degenerative myelopathy</li>
                <li>Exercise-induced collapse</li>
            </ul>
            <h4>Small Breeds</h4>
            <ul>
                <li>Patellar luxation</li>
                <li>Portosystemic shunt</li>
            </ul>
        </div>`
    },

    // Article 52: Puppy Nail Care
    {
        title: "Stress-Free Nail Trimming Techniques",
        content: `
        <div class="article">
            <h3>Anatomy Awareness</h3>
            <h4>Quick Identification</h4>
            <ul>
                <li>Use LED clippers for visualization</li>
                <li>Cut 2mm from quick</li>
            </ul>
            <h4>Alternatives to Clipping</h4>
            <ul>
                <li>Grinder tools</li>
                <li>Scratch boards</li>
                <li>Natural wear through exercise</li>
            </ul>
        </div>`
    },

    // Article 53: Puppy Playgroups
    {
        title: "Benefits of Structured Puppy Play Sessions",
        content: `
        <div class="article">
            <h3>Social Development Metrics</h3>
            <h4>Positive Outcomes</h4>
            <ul>
                <li>Improved bite inhibition</li>
                <li>Enhanced communication skills</li>
            </ul>
            <h4>Supervision Guidelines</h4>
            <ul>
                <li>1 human per 3 puppies</li>
                <li>15-minute maximum sessions</li>
            </ul>
        </div>`
    },

    // Article 54: Puppy Massage
    {
        title: "Therapeutic Massage for Puppy Development",
        content: `
        <div class="article">
            <h3>Technique Benefits</h3>
            <h4>Physical</h4>
            <ul>
                <li>Improved circulation</li>
                <li>Muscle tension relief</li>
            </ul>
            <h4>Emotional</h4>
            <ul>
                <li>Stress reduction</li>
                <li>Bonding enhancement</li>
            </ul>
        </div>`
    },

    // Article 55: Puppy Swimming Safety
    {
        title: "Introducing Puppies to Water Safely",
        content: `
        <div class="article">
            <h3>Progressive Training Steps</h3>
            <h4>Initial Exposure</h4>
            <ul>
                <li>Shallow wading pools</li>
                <li>Positive reinforcement</li>
            </ul>
            <h4>Advanced Safety</h4>
            <ul>
                <li>Canine life jackets</li>
                <li>Freshwater vs saltwater considerations</li>
            </ul>
        </div>`
    },

    // Article 56: Puppy Digging Behavior
    {
        title: "Redirecting Natural Digging Instincts",
        content: `
        <div class="article">
            <h3>Management Solutions</h3>
            <h4>Acceptable Outlets</h4>
            <ul>
                <li>Designated sandbox areas</li>
                <li>Burrow-style beds</li>
            </ul>
            <h4>Deterrent Methods</h4>
            <ul>
                <li>Chicken wire barriers</li>
                <li>Citrus-based sprays</li>
            </ul>
        </div>`
    },

    // Article 57: Puppy Sleep Cycles
    {
        title: "Understanding Puppy REM Sleep Patterns",
        content: `
        <div class="article">
            <h3>Developmental Stages</h3>
            <h4>0-12 Weeks</h4>
            <ul>
                <li>18-20 hours daily sleep</li>
                <li>Frequent REM cycles</li>
            </ul>
            <h4>3-6 Months</h4>
            <ul>
                <li>16-18 hours daily</li>
                <li>Consolidated sleep periods</li>
            </ul>
        </div>`
    },

    // Article 58: Puppy Insurance
    {
        title: "Pet Insurance Considerations for Puppies",
        content: `
        <div class="article">
            <h3>Policy Evaluation Criteria</h3>
            <h4>Coverage Essentials</h4>
            <ul>
                <li>Hereditary conditions</li>
                <li>Chronic illness support</li>
            </ul>
            <h4>Cost Factors</h4>
            <ul>
                <li>Breed-specific premiums</li>
                <li>Deductible options</li>
            </ul>
        </div>`
    },

    // Article 59: Puppy Scent Work
    {
        title: "Introducing Nose Work to Puppies",
        content: `
        <div class="article">
            <h3>Training Progression</h3>
            <h4>Beginner Exercises</h4>
            <ul>
                <li>Treat searches in grass</li>
                <li>Scent pairing games</li>
            </ul>
            <h4>Advanced Applications</h4>
            <ul>
                <li>Tracking foundations</li>
                <li>Odor discrimination</li>
            </ul>
        </div>`
    },

    // Article 60: Puppy Grooming Tools
    {
        title: "Essential Grooming Tools by Coat Type",
        content: `
        <div class="article">
            <h3>Tool Selection Guide</h3>
            <h4>Short Coats</h4>
            <ul>
                <li>Rubber curry brushes</li>
                <li>Shedding blades</li>
            </ul>
            <h4>Long Coats</h4>
            <ul>
                <li>Mat breakers</li>
                <li>Detangling sprays</li>
            </ul>
        </div>`
    },

    // Article 61: Puppy Car Anxiety
    {
        title: "Reducing Motion Sickness in Puppies",
        content: `
        <div class="article">
            <h3>Desensitization Protocol</h3>
            <h4>Stepwise Training</h4>
            <ul>
                <li>Engine-off crate exposure</li>
                <li>Short stationary sessions</li>
                <li>Gradual driveway maneuvers</li>
            </ul>
        </div>`
    },

    // Article 62: Puppy Herding Instincts
    {
        title: "Managing Natural Herding Behaviors",
        content: `
        <div class="article">
            <h3>Channeling Energy Productively</h3>
            <h4>Acceptable Outlets</h4>
            <ul>
                <li>Treibball training</li>
                <li>Flirt pole exercises</li>
            </ul>
            <h4>Behavior Modification</h4>
            <ul>
                <li>Redirected nipping</li>
                <li>Impulse control training</li>
            </ul>
        </div>`
    },

    // Article 63: Puppy Adoption Transition
    {
        title: "Smooth Transition Strategies for Rescue Puppies",
        content: `
        <div class="article">
            <h3>First Week Protocol</h3>
            <h4>Environmental Setup</h4>
            <ul>
                <li>Quiet space creation</li>
                <li>Scent swapping techniques</li>
            </ul>
            <h4>Behavior Monitoring</h4>
            <ul>
                <li>3-3-3 rule explanation</li>
                <li>Stress signal recognition</li>
            </ul>
        </div>`
    },

    // Article 64: Puppy Agility Basics
    {
        title: "Introducing Agility Foundations to Puppies",
        content: `
        <div class="article">
            <h3>Age-Appropriate Training</h3>
            <h4>Under 6 Months</h4>
            <ul>
                <li>Body awareness exercises</li>
                <li>Flatwork training</li>
            </ul>
            <h4>6-12 Months</h4>
            <ul>
                <li>Low-impact jumps</li>
                <li>Tunnel introduction</li>
            </ul>
        </div>`
    }
];


const gallery = document.querySelector('.gallery');

// Generate the gallery
articles.forEach((article, index) => {
    const imgContainer = document.createElement('div');
    imgContainer.className = 'img-container';

    const img = document.createElement('img');
    img.src = `images/pupp (${index + 1}).jpg`;
    img.alt = article.title;
    img.loading = 'lazy';

    const imgTitle = document.createElement('p');
    imgTitle.textContent = article.title;

    imgContainer.appendChild(img);
    imgContainer.appendChild(imgTitle);
    gallery.appendChild(imgContainer);

    // Pass both article and index to the click handler
    imgContainer.addEventListener('click', () => {
        openArticleInNewWindow(article, index);
    });
});

// Function to open an article in a new window
function openArticleInNewWindow(article, index) {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light'; // Get the current theme
    const newWindow = window.open('', '_blank'); // Open a new blank window

    newWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en" data-theme="${currentTheme}"> <!-- Pass the current theme -->
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="description" content="${article.title}">
            <meta name="keywords" content="puppies, dogs, pet care">
            <meta name="author" content="Paws & Tails">
            <title>${article.title} - Paws & Tails</title>
            <style>
                /* Light Theme Variables */
                :root {
                    --background: #f9f9f9;
                    --text-color: #333;
                    --header-background: #4caf50;
                    --header-text-color: white;
                    --footer-background: #333;
                    --footer-text-color: white;
                    --article-background: white;
                    --heading-color: #333;
                    --button-background: #4caf50;
                    --button-text-color: white;
                }

                /* Dark Theme Variables */
                [data-theme="dark"] {
                    --background: #333;
                    --text-color: #f9f9f9;
                    --header-background: #222;
                    --header-text-color: #f9f9f9;
                    --footer-background: #222;
                    --footer-text-color: #f9f9f9;
                    --article-background: #444;
                    --heading-color: #f9f9f9;
                    --button-background: #555;
                    --button-text-color: #f9f9f9;
                }

                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                    line-height: 1.6;
                    background-color: var(--background);
                    color: var(--text-color);
                }

                header, footer {
                    background-color: var(--header-background);
                    color: var(--header-text-color);
                    padding: 10px 0;
                    text-align: center;
                }

                header img {
                    max-width: 100px;
                    height: auto;
                }

                article {
                    background-color: var(--article-background);
                    padding: 20px;
                    margin: 20px 0;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }

                article img {
                    max-width: 100%;
                    height: auto;
                    margin: 20px 0;
                }

                h1 {
                    color: var(--heading-color);
                }

                ul {
                    margin-left: 20px;
                }

                .back-btn {
                    display: inline-block;
                    margin-top: 20px;
                    padding: 10px 20px;
                    background-color: var(--button-background);
                    color: var(--button-text-color);
                    text-decoration: none;
                    border-radius: 5px;
                }

                .back-btn:hover {
                    background-color: var(--button-hover-background);
                }
            </style>
        </head>
        <body>
            <header>
                <img src="images/logo.png" alt="Paws & Tails Logo">
                <h1>Paws & Tails</h1>
                <p>Your Trusted Source for Pet Care Information</p>
            </header>
            <article>
                <img src="images/pupp (${index + 1}).jpg" alt="${article.title}">
                ${article.content}
                <a href="javascript:window.close()" class="back-btn">Close Window</a>
            </article>
            <footer>
                <p>&copy; 2025 Paws & Tails. All rights reserved.</p>
            </footer>
        </body>
        </html>
    `);
    newWindow.document.close(); // Close the document to finish loading
}